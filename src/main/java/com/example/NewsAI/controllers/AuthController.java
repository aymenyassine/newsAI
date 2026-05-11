package com.example.NewsAI.controllers;

import com.example.NewsAI.entities.User;
import com.example.NewsAI.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return authService.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        return authService.login(user.getEmail(), user.getPassword());
    }

    @GetMapping("/me")
    public User me(Authentication auth) {
        return authService.getCurrentUser(auth.getName());
    }
}