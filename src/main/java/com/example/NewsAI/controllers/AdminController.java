package com.example.NewsAI.controllers;

import com.example.NewsAI.services.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/stats")
    public Map<String, Long> getStats() {
        return adminService.getPlatformStats();
    }
}
