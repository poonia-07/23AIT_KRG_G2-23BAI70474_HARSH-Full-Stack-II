package com.livepoll.model;

import lombok.*;
import java.util.*;

/** In-memory Poll model for LivePoll system */
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Poll {
    private String id;
    private String question;
    private List<String> options;
    private Map<String, Integer> votes; // option → vote count
    private String createdBy;
    private boolean active;
}
