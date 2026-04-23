package com.livepoll.model;

import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor
public class RefreshRequest {
    private String refreshToken;
}
