package com.example.IslyNews.services;

import com.example.IslyNews.entities.SavedArticle;
import com.example.IslyNews.repositories.SavedArticleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class SavedArticleServiceImpl implements SavedArticleService {

    private final SavedArticleRepository savedArticleRepository;

    @Override
    public SavedArticle saveArticle(SavedArticle savedArticle) {
        boolean exists = savedArticleRepository.existsByUserIdAndArticleId(
                savedArticle.getUser().getId(),
                savedArticle.getArticle().getId()
        );

        if (exists) {
            throw new RuntimeException("Article already saved");
        }

        return savedArticleRepository.save(savedArticle);
    }

    @Override
    public List<SavedArticle> getSavedByUser(Long userId) {
        return savedArticleRepository.findByUserId(userId);
    }

    @Override
    public void removeSaved(Long id) {
        savedArticleRepository.deleteById(id);
    }
}