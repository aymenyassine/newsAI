package com.example.NewsAI.services;

import com.example.NewsAI.dtos.NewsApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
@RequiredArgsConstructor
public class NewsApiServiceImpl implements NewsApiService {

    private final RestTemplate restTemplate;

    @Value("${newsapi.api.key}")
    private String apiKey;

    @Value("${newsapi.api.base-url}")
    private String apiBaseUrl;

    @Override
    public NewsApiResponse getTopHeadlines(String country, String category, int page, int pageSize) {
        String url = UriComponentsBuilder.fromUriString(apiBaseUrl + "/top-headlines")
                .queryParam("apiKey", apiKey)
                .queryParam("country", country)
                .queryParam("category", category)
                .queryParam("page", page)
                .queryParam("pageSize", pageSize)
                .toUriString();

        return restTemplate.getForObject(url, NewsApiResponse.class);
    }

    @Override
    public NewsApiResponse searchNews(String query, int page, int pageSize) {
        String url = UriComponentsBuilder.fromUriString(apiBaseUrl + "/everything")
                .queryParam("apiKey", apiKey)
                .queryParam("q", query)
                .queryParam("page", page)
                .queryParam("pageSize", pageSize)
                .toUriString();

        return restTemplate.getForObject(url, NewsApiResponse.class);
    }
}
