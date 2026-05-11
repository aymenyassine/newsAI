package com.example.IslyNews.controllers;

import com.example.IslyNews.entities.Like;
import com.example.IslyNews.entities.User;
import com.example.IslyNews.repositories.LikeRepository;
import com.example.IslyNews.repositories.UserRepository;
import com.example.IslyNews.services.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/likes")
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;

    @PostMapping
    public Like likeArticle(@RequestBody Like like, Authentication auth) {
        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        like.setUser(user);
        return likeService.likeArticle(like);
    }

    @DeleteMapping("/{id}")
    public void unlike(@PathVariable Long id) {
        likeService.unlike(id);
    }

    @GetMapping("/check/{articleId}")
    public ResponseEntity<Boolean> checkIfLiked(@PathVariable Long articleId, Authentication auth) {
        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        boolean isLiked = likeRepository.existsByUserIdAndArticleId(user.getId(), articleId);
        return ResponseEntity.ok(isLiked);
    }

    @PostMapping("/toggle/{articleId}")
    public ResponseEntity<?> toggleLike(@PathVariable Long articleId, Authentication auth) {
        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        var existing = likeRepository.findByUserIdAndArticleId(user.getId(), articleId);
        
        if (existing.isPresent()) {
            likeRepository.delete(existing.get());
            return ResponseEntity.ok().body(new ToggleResponse(false, "Article unliked"));
        } else {
            Like like = new Like();
            like.setUser(user);
            like.setArticle(new com.example.IslyNews.entities.Article());
            like.getArticle().setId(articleId);
            likeRepository.save(like);
            return ResponseEntity.ok().body(new ToggleResponse(true, "Article liked"));
        }
    }

    record ToggleResponse(boolean liked, String message) {}
}
