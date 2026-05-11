package com.example.IslyNews.services;

import com.example.IslyNews.entities.Like;

public interface LikeService {

    Like likeArticle(Like like);

    void unlike(Long id);
}