package com.example.url.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import com.example.url.dto.UrlRequest;
import com.example.url.service.UrlService;

@RestController
public class UrlController {

    private final UrlService urlService;

    public UrlController(UrlService urlService) {
        this.urlService = urlService;
    }

    @PostMapping("/shorten")
    public Map<String, String> createShortUrl(@RequestBody UrlRequest request) {
        String shortUrl = urlService.createShortUrl(request.getUrl());

        Map<String, String> response = new HashMap<>();
        response.put("shortUrl", shortUrl);

        return response;
    }

    @GetMapping("/{shortUrl}")
    public void redirectToOriginal(
            @PathVariable String shortUrl,
            HttpServletResponse response) throws IOException {

        String originalUrl = urlService.getOriginalUrl(shortUrl);
        response.sendRedirect(originalUrl);
    }
}
