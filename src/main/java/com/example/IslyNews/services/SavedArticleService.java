package com.example.IslyNews.services;

import com.example.IslyNews.entities.SavedArticle;

import java.util.List;

public interface SavedArticleService {

    SavedArticle saveArticle(SavedArticle savedArticle);

    List<SavedArticle> getSavedByUser(Long userId);

    void removeSaved(Long id);
}