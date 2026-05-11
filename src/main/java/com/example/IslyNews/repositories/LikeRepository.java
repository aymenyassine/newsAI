package com.example.IslyNews.repositories;

import com.example.IslyNews.entities.Like;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {

    boolean existsByUserIdAndArticleId(Long userId, Long articleId);
    
    Optional<Like> findByUserIdAndArticleId(Long userId, Long articleId);
}