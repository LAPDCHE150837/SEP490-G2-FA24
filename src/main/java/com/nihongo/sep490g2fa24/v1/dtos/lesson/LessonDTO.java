package com.nihongo.sep490g2fa24.v1.dtos.lesson;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LessonDTO {
    private String id;
    private String courseId;
    private String lessonName;
    private int lessonOrder;
    private Instant createdAt;
    private Instant updatedAt;
}
