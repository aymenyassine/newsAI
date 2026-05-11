package com.example.NewsAI.services;

import com.example.NewsAI.repositories.ArticleRepository;
import com.example.NewsAI.repositories.CommentRepository;
import com.example.NewsAI.repositories.LikeRepository;
import com.example.NewsAI.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final ArticleRepository articleRepository;
    private final CommentRepository commentRepository;
    private final LikeRepository likeRepository;

    @Override
    public Map<String, Long> getPlatformStats() {
        return Map.of(
                "totalUsers", userRepository.count(),
                "totalArticles", articleRepository.count(),
                "totalComments", commentRepository.count(),
                "totalLikes", likeRepository.count());
    }
}
