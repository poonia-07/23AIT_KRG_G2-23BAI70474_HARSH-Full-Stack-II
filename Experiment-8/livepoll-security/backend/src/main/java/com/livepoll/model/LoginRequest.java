package com.livepoll.model;

import lombok.*;

import java.util.List;

/** Request body for POST /auth/login */
@Data @NoArgsConstructor @AllArgsConstructor
public class LoginRequest {
    private String username;
    private String password;
}
