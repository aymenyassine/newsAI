package com.example.NewsAI.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewsArticleDto {
    private String title;
    private String description;
    private String url;
    private String urlToImage;
    private String publishedAt;
    private String content;
    private SourceDto source;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SourceDto {
        private String id;
        private String name;
    }
}
