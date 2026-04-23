# Experiment 8 — App Security & Full-Stack Integration (LivePoll System)

## Aim
Implement backend security using Spring Security, JWT, role-based access control (RBAC), and connect it to a frontend — demonstrating real-world authentication and authorization patterns.

---

## Architecture

```
Frontend (index.html)              Backend (Spring Boot :8080)
───────────────────                ─────────────────────────────────────
1. POST /auth/login         →      AuthController.login()
   ← { accessToken, roles }        AuthenticationManager verifies creds
                                   JwtUtil generates JWT pair

2. GET /api/polls           →      SecurityFilterChain
   Authorization: Bearer JWT       → JwtAuthFilter validates token
   ← 200 polls data                → SecurityContext populated
                                   → @PreAuthorize checks roles
                                   → Controller responds

3. POST /api/polls          →      @PreAuthorize("hasAnyRole('MOD','ADMIN')")
   ← 403 Forbidden (USER)         USER gets 403, MODERATOR gets 200
```

---

## Security Components

### 1. SecurityFilterChain
Controls which URLs are open vs protected:
- `/auth/**` and `/public/**` → `permitAll()`
- Everything else → `authenticated()`
- Sessions: `STATELESS` (no HttpSession — JWT carries all state)

### 2. JwtAuthFilter (`OncePerRequestFilter`)
Runs before every request:
1. Reads `Authorization: Bearer <token>` header
2. Validates JWT (signature + expiry check)
3. Extracts username + roles from payload
4. Sets `SecurityContextHolder` → enables `@PreAuthorize`

### 3. JWT Structure
```
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjpbIlJPTEVfQURNSU4iXX0.xxx
      HEADER                          PAYLOAD                               SIGNATURE
```
- Header: `{ "alg": "HS256" }`
- Payload: `{ "sub": "admin", "roles": ["ROLE_ADMIN"], "iat": ..., "exp": ... }`
- Signature: `HMAC-SHA256(header + "." + payload, secretKey)`

### 4. RBAC with @PreAuthorize
```java
@GetMapping("/api/admin/users")
@PreAuthorize("hasRole('ADMIN')")          // only ROLE_ADMIN

@PostMapping("/api/polls")
@PreAuthorize("hasAnyRole('MODERATOR', 'ADMIN')")   // ROLE_MOD or ROLE_ADMIN

@PostMapping("/api/polls/{id}/vote")
@PreAuthorize("hasAnyRole('USER', 'MODERATOR', 'ADMIN')")  // any authenticated
```

### 5. CORS (Full-Stack Integration)
Allows React frontend (different origin) to call the Spring backend:
```java
config.setAllowedOrigins(List.of("http://localhost:3000", "null"));
config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
```

### 6. OAuth 2.0 (Conceptual)
Google Login flow:
1. User clicks "Login with Google" → redirect to `accounts.google.com`
2. User authenticates on Google (your app never sees password)
3. Google redirects back with `?code=AUTH_CODE`
4. Backend exchanges code for Google access token
5. Backend fetches profile, creates your own JWT → sends to frontend

---

## Test Users

| Username | Password | Role |
|---|---|---|
| `admin` | `admin123` | ADMIN |
| `moderator` | `mod123` | MODERATOR |
| `user` | `user123` | USER |

---

## How to Run

### Backend
```bash
cd Experiment-8/livepoll-security/backend
mvn spring-boot:run
```
Server starts at: `http://localhost:8080`

### Frontend
Open `frontend/index.html` directly in your browser (double-click) — CORS is configured for `file://` origin.

---

## Sample Requests (curl)

### Login
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Use the token
```bash
TOKEN="paste_access_token_here"

# Any authenticated user
curl http://localhost:8080/api/dashboard -H "Authorization: Bearer $TOKEN"

# ADMIN only
curl http://localhost:8080/api/admin/users -H "Authorization: Bearer $TOKEN"

# Public (no token)
curl http://localhost:8080/public/polls
```

### Create a poll (MODERATOR/ADMIN only)
```bash
curl -X POST http://localhost:8080/api/polls \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"question":"Best DB?","options":["MySQL","PostgreSQL","MongoDB"]}'
```
