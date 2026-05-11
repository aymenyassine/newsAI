package com.example.NewsAI.controllers;

import com.example.NewsAI.entities.Comment;
import com.example.NewsAI.services.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public Comment addComment(@RequestBody Comment comment, Authentication auth) {
        return commentService.addComment(comment, auth.getName());
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
