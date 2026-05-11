package com.example.IslyNews.controllers;

import com.example.IslyNews.repositories.ArticleRepository;
import com.example.IslyNews.repositories.CommentRepository;
import com.example.IslyNews.repositories.LikeRepository;
import com.example.IslyNews.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;
    private final ArticleRepository articleRepository;
    private final CommentRepository commentRepository;
    private final LikeRepository likeRepository;

    // UC16 - Superviser la plateforme
    @GetMapping("/stats")
    public Map<String, Long> getStats() {
        return Map.of(
                "totalUsers", userRepository.count(),
                "totalArticles", articleRepository.count(),
                "totalComments", commentRepository.count(),
                "totalLikes", likeRepository.count()
        );
    }
}
