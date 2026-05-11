package com.example.NewsAI.services;

import com.example.NewsAI.entities.Comment;

import java.util.List;

public interface CommentService {

    Comment addComment(Comment comment, String userEmail);

    List<Comment> getCommentsByArticle(Long articleId);

    void deleteComment(Long id);
}