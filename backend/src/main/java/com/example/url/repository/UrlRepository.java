package com.example.url.repository;

import com.example.url.entity.UrlEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UrlRepository extends MongoRepository<UrlEntity, String> {

    Optional<UrlEntity> findByShortUrl(String shortUrl);

    Optional<UrlEntity> findByOriginalUrl(String originalUrl);
}
