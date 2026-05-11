package com.example.IslyNews.services;

import com.example.IslyNews.entities.Like;
import com.example.IslyNews.repositories.LikeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class LikeServiceImpl implements LikeService {

    private final LikeRepository likeRepository;

    @Override
    public Like likeArticle(Like like) {

        boolean exists = likeRepository.existsByUserIdAndArticleId(
                like.getUser().getId(),
                like.getArticle().getId()
        );

        if (exists) {
            throw new RuntimeException("Already liked");
        }

        return likeRepository.save(like);
    }

    @Override
    public void unlike(Long id) {
        likeRepository.deleteById(id);
    }
}