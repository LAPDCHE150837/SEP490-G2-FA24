package com.nihongo.sep490g2fa24.dtoMapper;

import com.nihongo.sep490g2fa24.v1.dtos.course.CourseListDTO;
import com.nihongo.sep490g2fa24.v1.model.Course;
import org.springframework.stereotype.Component;

@Component
public class CourseMapper {
    public static CourseListDTO toListDTO(Course course) {
        return CourseListDTO.builder()
                .id(course.getId())
                .title(course.getTitle())
                .description(course.getDescription())
                .level(course.getLevel())
                .imageUrl(course.getImageUrl())
                .totalLessons(course.getTotalLessons())
                .status(course.getStatus())
                .createdAt(course.getCreatedAt())
                .updatedAt(course.getUpdatedAt())
                .build();
    }
}
