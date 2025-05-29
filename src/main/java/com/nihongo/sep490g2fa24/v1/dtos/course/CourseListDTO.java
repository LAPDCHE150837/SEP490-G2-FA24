package com.nihongo.sep490g2fa24.v1.dtos.course;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseListDTO {
    private String id;

    private String title;

    private String description;

    private String level; // N5, N4, N3, etc.

    private String imageUrl; // update url

    private Integer totalLessons = 0;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private Boolean status = true;
}
