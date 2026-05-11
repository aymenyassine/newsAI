package com.example.IslyNews.controllers;

import com.example.IslyNews.entities.Comment;
import com.example.IslyNews.entities.User;
import com.example.IslyNews.repositories.UserRepository;
import com.example.IslyNews.services.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;
    private final UserRepository userRepository;

    @PostMapping
    public Comment addComment(@RequestBody Comment comment, Authentication auth) {
        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        comment.setUser(user);
        return commentService.addComment(comment);
    }

    @GetMapping("/article/{articleId}")
    public List<Comment> getByArticle(@PathVariable Long articleId) {
        return commentService.getCommentsByArticle(articleId);
    }

    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
    }
}
