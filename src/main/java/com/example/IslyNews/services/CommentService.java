package com.example.IslyNews.services;

import com.example.IslyNews.entities.Comment;

import java.util.List;

public interface CommentService {

    Comment addComment(Comment comment);

    List<Comment> getCommentsByArticle(Long articleId);

    void deleteComment(Long id);
}