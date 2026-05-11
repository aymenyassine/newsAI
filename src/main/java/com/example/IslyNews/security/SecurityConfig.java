package com.example.IslyNews.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.*;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:4200"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf(csrf -> csrf.disable());
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()));

        http.authorizeHttpRequests(auth -> auth
                // Auth publique
                .requestMatchers("/auth/register", "/auth/login").permitAll()
                .requestMatchers("/auth/me").authenticated()

                // Consultation publique (Guest)
                .requestMatchers(HttpMethod.GET, "/articles").permitAll()
                .requestMatchers(HttpMethod.GET, "/articles/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/comments/**").permitAll()

                // Résumé IA : accessible à tous (Guest inclus)
                .requestMatchers(HttpMethod.GET, "/articles/*/summary").permitAll()

                // Journaliste : publier, modifier et supprimer SES articles
                .requestMatchers(HttpMethod.POST, "/articles").hasAnyRole("JOURNALIST", "ADMIN")
                .requestMatchers(HttpMethod.PUT, "/articles/**").hasAnyRole("JOURNALIST", "ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/articles/**").hasAnyRole("JOURNALIST", "ADMIN")

                // User connecté : liker, commenter, sauvegarder
                .requestMatchers(HttpMethod.POST, "/likes").hasAnyRole("USER", "JOURNALIST", "ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/likes/**").hasAnyRole("USER", "JOURNALIST", "ADMIN")
                .requestMatchers(HttpMethod.POST, "/comments").hasAnyRole("USER", "JOURNALIST", "ADMIN")
                .requestMatchers(HttpMethod.POST, "/saved-articles").hasAnyRole("USER", "JOURNALIST", "ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/saved-articles/**").hasAnyRole("USER", "JOURNALIST", "ADMIN")
                .requestMatchers(HttpMethod.GET, "/saved-articles/**").hasAnyRole("USER", "JOURNALIST", "ADMIN")

                // Admin uniquement
                .requestMatchers(HttpMethod.DELETE, "/comments/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/users").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/users/journalist").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/users/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/users").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/users/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/admin/**").hasRole("ADMIN")

                .anyRequest().authenticated()
        );

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
