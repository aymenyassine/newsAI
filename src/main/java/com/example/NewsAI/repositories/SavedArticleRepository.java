package com.example.NewsAI.repositories;

import com.example.NewsAI.entities.SavedArticle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SavedArticleRepository extends JpaRepository<SavedArticle, Long> {

    List<SavedArticle> findByUserId(Long userId);

    boolean existsByUserIdAndArticleId(Long userId, Long articleId);

    Optional<SavedArticle> findByUserIdAndArticleId(Long userId, Long articleId);
}