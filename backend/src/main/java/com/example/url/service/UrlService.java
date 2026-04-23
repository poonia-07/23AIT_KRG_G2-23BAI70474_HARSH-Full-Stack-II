package com.example.url.service;

public interface UrlService {

    String createShortUrl(String originalUrl);

    String getOriginalUrl(String shortUrl);
}
