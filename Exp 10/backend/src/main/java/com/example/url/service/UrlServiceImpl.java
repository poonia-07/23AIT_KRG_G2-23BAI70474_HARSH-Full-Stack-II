package com.example.url.service;

import com.example.url.entity.UrlEntity;
import com.example.url.repository.UrlRepository;
import com.example.url.util.Base62Util;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UrlServiceImpl implements UrlService {

    private final UrlRepository repository;

    public UrlServiceImpl(UrlRepository repository) {
        this.repository = repository;
    }

    @Override
    public String createShortUrl(String originalUrl) {

        // 🔥 1️⃣ Normalize URL (ADD https:// if missing)
        originalUrl = normalizeUrl(originalUrl);

        // 2️⃣ Check if original URL already exists
        Optional<UrlEntity> existingUrl =
                repository.findByOriginalUrl(originalUrl);

        if (existingUrl.isPresent()) {
            // ✅ Return existing short URL (NO new save)
            return existingUrl.get().getShortUrl();
        }

        // 3️⃣ Generate new short URL
        String base62 = Base62Util.encode(System.currentTimeMillis());
        String shortUrl = Base62Util.customHash(base62);

        UrlEntity entity = new UrlEntity();
        entity.setOriginalUrl(originalUrl);
        entity.setShortUrl(shortUrl);
        entity.setDayCount(0);
        entity.setMonthCount(0);
        entity.setCreatedAt(LocalDateTime.now());
        entity.setLastAccessed(LocalDateTime.now());

        repository.save(entity);

        return shortUrl;
    }

    @Override
    public String getOriginalUrl(String shortUrl) {

        UrlEntity entity = repository.findByShortUrl(shortUrl)
                .orElseThrow(() -> new RuntimeException("Short URL not found"));

        entity.setDayCount(entity.getDayCount() + 1);
        entity.setMonthCount(entity.getMonthCount() + 1);
        entity.setLastAccessed(LocalDateTime.now());

        repository.save(entity);
        return entity.getOriginalUrl();
    }

    // 🔹 Helper method for URL normalization
    private String normalizeUrl(String url) {

        if (url == null || url.trim().isEmpty()) {
            throw new IllegalArgumentException("URL cannot be empty");
        }

        url = url.trim();

        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            url = "https://" + url;
        }

        return url;
    }
}
