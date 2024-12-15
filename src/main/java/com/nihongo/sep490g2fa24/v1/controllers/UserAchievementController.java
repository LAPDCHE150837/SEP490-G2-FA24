package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.dtoMapper.UserAchievementMapper;
import com.nihongo.sep490g2fa24.v1.dtos.course.UserAchievementDTO;
import com.nihongo.sep490g2fa24.v1.model.UserAchievement;
import com.nihongo.sep490g2fa24.v1.repositories.UserAchievementRepository;
import com.nihongo.sep490g2fa24.v1.services.impl.UserAchievementService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user-achievements")
@RequiredArgsConstructor
public class UserAchievementController {

    private final UserAchievementService userAchievementService;
    private final UserAchievementRepository userAchievementRepository;
    private final UserAchievementMapper userAchievementMapper;

    @GetMapping("/course/{courseId}")
    public BaseApiResponse<UserAchievementDTO> getByCourseId(@PathVariable String courseId) {
        UserAchievement userAchievement = userAchievementRepository.findById(courseId).orElseThrow();
        UserAchievementDTO userAchievementDTO = userAchievementMapper.toDTO(userAchievement);
        return BaseApiResponse.succeed(userAchievementDTO);
    }

    @PostMapping("/{courseId}")
    public ResponseEntity<UserAchievement> createAchievement(
            HttpServletRequest req,
            @PathVariable String courseId) {
        return ResponseEntity.ok(userAchievementService.createAchievement(req.getRemoteUser(), courseId));
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<List<UserAchievementDTO>> getUserAchievement(@PathVariable String courseId, HttpServletRequest req) {
        // Fetch the current username from the request
        String username = req.getRemoteUser();

        // Call the service and return the response
        List<UserAchievementDTO> achievement = userAchievementService.getUserAchievementsAndCourse(username, courseId);
        return ResponseEntity.ok(achievement);
    }


    @GetMapping
    public ResponseEntity<List<UserAchievementDTO>> getAllAchievement(HttpServletRequest req) {
        // Fetch the current username from the request
        String username = req.getRemoteUser();

        // Call the service and return the response
        List<UserAchievementDTO> achievement = userAchievementService.getUserAchievements(username);
        return ResponseEntity.ok(achievement);
    }

}