package com.nihongo.sep490g2fa24.v1.services.impl;


import com.nihongo.sep490g2fa24.dtoMapper.UserAchievementMapper;
import com.nihongo.sep490g2fa24.v1.dtos.course.UserAchievementDTO;
import com.nihongo.sep490g2fa24.v1.model.Course;
import com.nihongo.sep490g2fa24.v1.model.User;
import com.nihongo.sep490g2fa24.v1.model.UserAchievement;
import com.nihongo.sep490g2fa24.v1.repositories.CourseRepository;
import com.nihongo.sep490g2fa24.v1.repositories.UserAchievementRepository;
import com.nihongo.sep490g2fa24.v1.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserAchievementService {

    private final UserAchievementRepository userAchievementRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final UserAchievementMapper userAchievementMapper;

    @Transactional
    public UserAchievement createAchievement(String userId, String courseId) {
        User user = userRepository.findByUsername(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        UserAchievement achievement = UserAchievement.builder()
                .user(user)
                .course(course)
                .build();

        return userAchievementRepository.save(achievement);
    }


    public List<UserAchievementDTO> getUserAchievementsAndCourse(String username, String courseId) {
        // Fetch the user by username
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Fetch achievements matching courseId and userId (distinct results)
        List<UserAchievement> achievements = userAchievementRepository.findDistinctByUserIdAndCourseId(user.getId(),courseId);

        // Check if achievements are empty
        if (achievements.isEmpty()) {
            throw new RuntimeException("User achievements not found");
        }

        // Map the entity list to a DTO list
        return achievements.stream()
                .map(userAchievementMapper::toDTO)
                .collect(Collectors.toList());
    }


    public List<UserAchievementDTO> getUserAchievements(String username) { // Fetch the user by username
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Fetch achievements matching courseId and userId (distinct results)
        List<UserAchievement> achievements = userAchievementRepository.findDistinctByUserId(user.getId());

        // Check if achievements are empty
        if (achievements.isEmpty()) {
            throw new RuntimeException("User achievements not found");
        }

        // Map the entity list to a DTO list
        return achievements.stream()
                .map(userAchievementMapper::toDTO)
                .collect(Collectors.toList());

    }
}