package com.nihongo.sep490g2fa24.dtoMapper;

import com.nihongo.sep490g2fa24.v1.dtos.course.UserAchievementDTO;
import com.nihongo.sep490g2fa24.v1.model.Course;
import com.nihongo.sep490g2fa24.v1.model.User;
import com.nihongo.sep490g2fa24.v1.model.UserAchievement;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserAchievementMapper {

    public UserAchievementDTO toDTO(UserAchievement achievement) {
        if (achievement == null) return null;

        return UserAchievementDTO.builder()
                .id(achievement.getId())
                .userId(achievement.getUser().getId())
                .courseId(achievement.getCourse().getId())

                .build();
    }

    public UserAchievement toEntity(UserAchievementDTO dto, User user, Course course) {
        if (dto == null) return null;

        return UserAchievement.builder()
                .user(user)
                .course(course)

                .build();
    }

}
