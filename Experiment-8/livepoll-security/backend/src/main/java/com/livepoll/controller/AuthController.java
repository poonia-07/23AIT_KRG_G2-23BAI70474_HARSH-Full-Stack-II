package com.livepoll.controller;

import com.livepoll.model.AuthResponse;
import com.livepoll.model.LoginRequest;
import com.livepoll.model.RefreshRequest;
import com.livepoll.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * AuthController — handles login, refresh, logout.
 *
 * These endpoints are permitAll() in SecurityConfig — no JWT needed to reach them.
 *
 * Flow:
 *   POST /auth/login   → Spring verifies credentials → issue JWT pair
 *   POST /auth/refresh → validate refresh token → issue new access token
 *   POST /auth/logout  → stateless: just tell client to delete tokens
 */
@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;

    // ── LOGIN ─────────────────────────────────────────────────────────────────
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        log.debug("Login attempt: {}", request.getUsername());
        try {
            Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            List<String> roles = auth.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .toList();

            String accessToken  = jwtUtil.generateAccessToken(auth.getName(), roles);
            String refreshToken = jwtUtil.generateRefreshToken(auth.getName());

            log.info("✓ Login OK: {} → {}", auth.getName(), roles);

            return ResponseEntity.ok(AuthResponse.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .username(auth.getName())
                    .roles(roles)
                    .build());

        } catch (Exception e) {
            log.warn("✗ Login failed for {}: {}", request.getUsername(), e.getMessage());
            return ResponseEntity.status(401).body(Map.of("error", "Invalid username or password"));
        }
    }

    // ── REFRESH TOKEN ─────────────────────────────────────────────────────────
    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody RefreshRequest request) {
        String rt = request.getRefreshToken();

        if (!jwtUtil.validateToken(rt)) {
            return ResponseEntity.status(401).body(Map.of("error", "Refresh token expired or invalid. Please login again."));
        }
        if (!"refresh".equals(jwtUtil.extractType(rt))) {
            return ResponseEntity.status(401).body(Map.of("error", "Wrong token type"));
        }

        String username = jwtUtil.extractUsername(rt);
        // In real app: look up roles from DB. For demo: default USER role.
        String newAccessToken = jwtUtil.generateAccessToken(username, List.of("ROLE_USER"));

        log.info("✓ Token refreshed for: {}", username);
        return ResponseEntity.ok(Map.of("accessToken", newAccessToken, "tokenType", "Bearer"));
    }

    // ── LOGOUT ────────────────────────────────────────────────────────────────
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // Stateless JWT: server has no session to invalidate.
        // Client must delete tokens from localStorage.
        // Production: maintain a token blocklist in Redis.
        return ResponseEntity.ok(Map.of(
            "message", "Logged out successfully. Delete your tokens on the client side.",
            "note", "JWT is stateless — server doesn't store sessions"
        ));
    }

    // ── CURRENT USER INFO ─────────────────────────────────────────────────────
    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication auth) {
        if (auth == null) return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        return ResponseEntity.ok(Map.of(
            "username", auth.getName(),
            "roles", auth.getAuthorities().stream().map(Object::toString).toList()
        ));
    }
}
