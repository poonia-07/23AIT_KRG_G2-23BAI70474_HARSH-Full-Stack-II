package com.example.url.scheduler;

import com.example.url.entity.UrlEntity;
import com.example.url.repository.UrlRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class CleanupScheduler {

    private final UrlRepository repository;

    public CleanupScheduler(UrlRepository repository) {
        this.repository = repository;
    }

    @Scheduled(cron = "0 0 0 1 * ?")
    public void deleteUnusedUrls() {

        LocalDateTime oneMonthAgo = LocalDateTime.now().minusMonths(1);
        List<UrlEntity> urls = repository.findAll();

        for (UrlEntity url : urls) {
            if (url.getLastAccessed().isBefore(oneMonthAgo)) {
                repository.delete(url);
            }
        }
    }
}
