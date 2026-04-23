package com.livepoll;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * LivePollSecurityApplication — Entry point for Experiment 8.
 *
 * Demonstrates:
 *  - Spring Security filter chain (JWT-based, stateless)
 *  - Authentication (POST /auth/login → JWT pair)
 *  - Authorization via RBAC (@PreAuthorize on controller methods)
 *  - CORS for full-stack React integration
 *  - OAuth 2.0 concepts (explained in frontend)
 */
@SpringBootApplication
public class LivePollSecurityApplication {
    public static void main(String[] args) {
        SpringApplication.run(LivePollSecurityApplication.class, args);
        System.out.println("""
            ╔══════════════════════════════════════════════╗
            ║   LivePoll Security — Experiment 8 Running  ║
            ║   http://localhost:8080                      ║
            ║                                              ║
            ║   Users:  admin / admin123   (ADMIN)         ║
            ║           moderator / mod123 (MODERATOR)     ║
            ║           user / user123     (USER)          ║
            ║                                              ║
            ║   Open frontend/index.html in browser        ║
            ╚══════════════════════════════════════════════╝
            """);
    }
}
