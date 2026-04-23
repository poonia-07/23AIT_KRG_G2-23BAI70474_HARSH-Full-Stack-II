package com.livepoll.model;

import lombok.*;
import java.util.List;

/** Response body returned after successful login */
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class AuthResponse {
    private String accessToken;
    private String refreshToken;
    private String tokenType = "Bearer";
    private String username;
    private List<String> roles;
}
