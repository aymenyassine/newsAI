package com.example.NewsAI.services;

import com.example.NewsAI.dtos.NewsApiResponse;

public interface NewsApiService {
    NewsApiResponse getTopHeadlines(String country, String category, int page, int pageSize);

    NewsApiResponse searchNews(String query, int page, int pageSize);
}
