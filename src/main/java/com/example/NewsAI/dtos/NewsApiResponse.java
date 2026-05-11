package com.example.NewsAI.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewsApiResponse {
    private String status;
    private int totalResults;
    private List<NewsArticleDto> articles;
}
