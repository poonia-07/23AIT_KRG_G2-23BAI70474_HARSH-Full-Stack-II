package com.livepoll.controller;

import com.livepoll.model.Poll;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * PollController — demonstrates Role-Based Access Control (RBAC).
 *
 * @PreAuthorize runs AFTER JwtAuthFilter sets the Authentication.
 * It evaluates the SpEL expression against the roles in the JWT.
 *
 * LivePoll RBAC matrix:
 * ┌─────────────────────────┬──────┬───────────┬───────┐
 * │ Action                  │ USER │ MODERATOR │ ADMIN │
 * ├─────────────────────────┼──────┼───────────┼───────┤
 * │ View public polls       │  ✓   │     ✓     │   ✓   │
 * │ Cast a vote             │  ✓   │     ✓     │   ✓   │
 * │ Create a poll           │  ✗   │     ✓     │   ✓   │
 * │ Close/delete a poll     │  ✗   │     ✓     │   ✓   │
 * │ View all users          │  ✗   │     ✗     │   ✓   │
 * │ Delete any user         │  ✗   │     ✗     │   ✓   │
 * └─────────────────────────┴──────┴───────────┴───────┘
 */
@Slf4j
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:5500", "null"})
public class PollController {

    // In-memory poll store (no DB needed for this demo)
    private final Map<String, Poll> polls = new ConcurrentHashMap<>();
    private final Map<String, List<String>> userVotes = new ConcurrentHashMap<>(); // pollId → list of voters

    public PollController() {
        // Seed some sample polls
        String id1 = UUID.randomUUID().toString().substring(0, 8);
        polls.put(id1, Poll.builder()
                .id(id1).question("What is your favourite programming language?")
                .options(List.of("Java", "Python", "JavaScript", "C++"))
                .votes(new LinkedHashMap<>(Map.of("Java", 5, "Python", 8, "JavaScript", 3, "C++", 2)))
                .createdBy("admin").active(true).build());

        String id2 = UUID.randomUUID().toString().substring(0, 8);
        polls.put(id2, Poll.builder()
                .id(id2).question("Best backend framework?")
                .options(List.of("Spring Boot", "Django", "Express.js", "FastAPI"))
                .votes(new LinkedHashMap<>(Map.of("Spring Boot", 10, "Django", 4, "Express.js", 6, "FastAPI", 3)))
                .createdBy("moderator").active(true).build());
    }

    // ── PUBLIC — any visitor (no JWT needed) ──────────────────────────────────
    @GetMapping("/public/polls")
    public ResponseEntity<?> getPublicPolls() {
        return ResponseEntity.ok(Map.of(
            "polls", polls.values().stream().filter(Poll::isActive).toList(),
            "message", "Public endpoint — no JWT required"
        ));
    }

    // ── USER — authenticated users can vote ───────────────────────────────────
    @PostMapping("/api/polls/{pollId}/vote")
    @PreAuthorize("hasAnyRole('USER', 'MODERATOR', 'ADMIN')")
    public ResponseEntity<?> castVote(@PathVariable String pollId,
                                       @RequestParam String option,
                                       Authentication auth) {
        Poll poll = polls.get(pollId);
        if (poll == null) return ResponseEntity.notFound().build();
        if (!poll.isActive()) return ResponseEntity.badRequest().body(Map.of("error", "Poll is closed"));
        if (!poll.getOptions().contains(option)) return ResponseEntity.badRequest().body(Map.of("error", "Invalid option"));

        // Prevent double voting
        List<String> voters = userVotes.computeIfAbsent(pollId, k -> Collections.synchronizedList(new ArrayList<>()));
        if (voters.contains(auth.getName())) {
            return ResponseEntity.badRequest().body(Map.of("error", "You have already voted in this poll"));
        }

        poll.getVotes().merge(option, 1, Integer::sum);
        voters.add(auth.getName());

        log.info("✓ {} voted '{}' in poll {}", auth.getName(), option, pollId);
        return ResponseEntity.ok(Map.of(
            "message", "Vote recorded!",
            "poll", poll
        ));
    }

    // ── MODERATOR — can create polls ──────────────────────────────────────────
    @PostMapping("/api/polls")
    @PreAuthorize("hasAnyRole('MODERATOR', 'ADMIN')")
    public ResponseEntity<?> createPoll(@RequestBody Map<String, Object> body, Authentication auth) {
        String question = (String) body.get("question");
        @SuppressWarnings("unchecked")
        List<String> options = (List<String>) body.get("options");

        if (question == null || options == null || options.size() < 2) {
            return ResponseEntity.badRequest().body(Map.of("error", "question and at least 2 options required"));
        }

        String id = UUID.randomUUID().toString().substring(0, 8);
        Map<String, Integer> votes = new LinkedHashMap<>();
        options.forEach(o -> votes.put(o, 0));

        Poll poll = Poll.builder()
                .id(id).question(question).options(options)
                .votes(votes).createdBy(auth.getName()).active(true).build();
        polls.put(id, poll);

        log.info("✓ Poll created by {}: '{}'", auth.getName(), question);
        return ResponseEntity.ok(Map.of("message", "Poll created", "poll", poll));
    }

    // ── MODERATOR — can close polls ───────────────────────────────────────────
    @PutMapping("/api/polls/{pollId}/close")
    @PreAuthorize("hasAnyRole('MODERATOR', 'ADMIN')")
    public ResponseEntity<?> closePoll(@PathVariable String pollId, Authentication auth) {
        Poll poll = polls.get(pollId);
        if (poll == null) return ResponseEntity.notFound().build();
        poll.setActive(false);
        log.info("Poll {} closed by {}", pollId, auth.getName());
        return ResponseEntity.ok(Map.of("message", "Poll closed", "pollId", pollId));
    }

    // ── ADMIN — view all users (simulated) ───────────────────────────────────
    @GetMapping("/api/admin/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(Map.of(
            "users", List.of(
                Map.of("username", "admin",     "role", "ADMIN",     "status", "active"),
                Map.of("username", "moderator", "role", "MODERATOR", "status", "active"),
                Map.of("username", "user",      "role", "USER",      "status", "active")
            ),
            "note", "ADMIN-only endpoint — @PreAuthorize(\"hasRole('ADMIN')\")"
        ));
    }

    // ── ADMIN — delete a poll ─────────────────────────────────────────────────
    @DeleteMapping("/api/admin/polls/{pollId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deletePoll(@PathVariable String pollId, Authentication auth) {
        if (!polls.containsKey(pollId)) return ResponseEntity.notFound().build();
        polls.remove(pollId);
        userVotes.remove(pollId);
        log.info("Poll {} deleted by admin {}", pollId, auth.getName());
        return ResponseEntity.ok(Map.of("message", "Poll " + pollId + " deleted by " + auth.getName()));
    }

    // ── AUTHENTICATED — any logged-in user's dashboard ────────────────────────
    @GetMapping("/api/dashboard")
    public ResponseEntity<?> dashboard(Authentication auth) {
        return ResponseEntity.ok(Map.of(
            "welcome", "Hello " + auth.getName() + "!",
            "roles", auth.getAuthorities().stream().map(Object::toString).toList(),
            "totalPolls", polls.size(),
            "activePolls", polls.values().stream().filter(Poll::isActive).count(),
            "serverTime", LocalDateTime.now().toString()
        ));
    }

    // ── ALL POLLS (authenticated) ─────────────────────────────────────────────
    @GetMapping("/api/polls")
    public ResponseEntity<?> getAllPolls() {
        return ResponseEntity.ok(polls.values());
    }
}
