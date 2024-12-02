package com.nihongo.sep490g2fa24.dtoMapper;

import com.nihongo.sep490g2fa24.v1.dtos.course.UserProgressDTO;
import com.nihongo.sep490g2fa24.v1.model.Lesson;
import com.nihongo.sep490g2fa24.v1.model.User;
import com.nihongo.sep490g2fa24.v1.model.UserProgress;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class UserProgressMapper {

    public UserProgressDTO toDTO(UserProgress userProgress) {
        if (userProgress == null) return null;

        return UserProgressDTO.builder()
                .id(userProgress.getId())
                .userId(userProgress.getUser().getId())
                .lessonId(userProgress.getLesson().getId())
                .completed(userProgress.getCompleted())
                .lastStudiedAt(userProgress.getLastStudiedAt())
                .createdAt(userProgress.getCreatedAt())
                .updatedAt(userProgress.getUpdatedAt())
                .build();
    }

    public UserProgress toEntity(UserProgressDTO dto, User user, Lesson lesson) {
        if (dto == null) return null;

        return UserProgress.builder()
                .user(user)
                .lesson(lesson)
                .completed(dto.getCompleted())
                .lastStudiedAt(dto.getLastStudiedAt())
                .createdAt(dto.getCreatedAt())
                .updatedAt(dto.getUpdatedAt())
                .build();
    }

    public void updateEntity(UserProgress userProgress, UserProgressDTO dto) {
        if (dto == null) return;

        userProgress.setCompleted(dto.getCompleted());
        userProgress.setLastStudiedAt(dto.getLastStudiedAt());
        userProgress.setUpdatedAt( LocalDateTime.now());
    }
}
