package com.nihongo.sep490g2fa24.v1.dtos.course;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

// TestDTO.java
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TestDTO {
    private String id;
    private String lessonId;
    private String title;
    private String description;
    private Integer duration;
    private Integer passScore;
    private Date createdAt;
    private Date updatedAt;
    private List<TestQuestionDTO> questions;
}

