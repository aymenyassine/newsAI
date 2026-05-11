package com.example.IslyNews.controllers;

import com.example.IslyNews.entities.SavedArticle;
import com.example.IslyNews.entities.User;
import com.example.IslyNews.repositories.SavedArticleRepository;
import com.example.IslyNews.repositories.UserRepository;
import com.example.IslyNews.services.SavedArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/saved-articles")
@RequiredArgsConstructor
public class SavedArticleController {

    private final SavedArticleService savedArticleService;
    private final UserRepository userRepository;
    private final SavedArticleRepository savedArticleRepository;

    @PostMapping
    public SavedArticle saveArticle(@RequestBody SavedArticle savedArticle, Authentication auth) {
        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        savedArticle.setUser(user);
        return savedArticleService.saveArticle(savedArticle);
    }

    @GetMapping("/me")
    public List<SavedArticle> getMySaved(Authentication auth) {
        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return savedArticleService.getSavedByUser(user.getId());
    }

    @GetMapping("/user/{userId}")
    public List<SavedArticle> getByUser(@PathVariable Long userId) {
        return savedArticleService.getSavedByUser(userId);
    }

    @DeleteMapping("/{id}")
    public void removeSaved(@PathVariable Long id) {
        savedArticleService.removeSaved(id);
    }

    @GetMapping("/check/{articleId}")
    public ResponseEntity<Boolean> checkIfSaved(@PathVariable Long articleId, Authentication auth) {
        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        boolean isSaved = savedArticleRepository.existsByUserIdAndArticleId(user.getId(), articleId);
        return ResponseEntity.ok(isSaved);
    }

    @PostMapping("/toggle/{articleId}")
    public ResponseEntity<?> toggleSave(@PathVariable Long articleId, Authentication auth) {
        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        var existing = savedArticleRepository.findByUserIdAndArticleId(user.getId(), articleId);
        
        if (existing.isPresent()) {
            savedArticleRepository.delete(existing.get());
            return ResponseEntity.ok().body(new ToggleResponse(false, "Article unsaved"));
        } else {
            SavedArticle savedArticle = new SavedArticle();
            savedArticle.setUser(user);
            savedArticle.setArticle(new com.example.IslyNews.entities.Article());
            savedArticle.getArticle().setId(articleId);
            savedArticleRepository.save(savedArticle);
            return ResponseEntity.ok().body(new ToggleResponse(true, "Article saved"));
        }
    }

    record ToggleResponse(boolean saved, String message) {}
}
