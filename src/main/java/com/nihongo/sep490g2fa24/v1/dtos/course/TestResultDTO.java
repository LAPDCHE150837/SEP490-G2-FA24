package com.nihongo.sep490g2fa24.v1.dtos.course;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TestResultDTO {
    private String id;
    private String userId;
    private String testId;
    private Integer score;
    private Integer timeTaken;
    private LocalDateTime completedAt;
    private LocalDateTime createdAt;
    private List<UserAnswerDTO> userAnswers;
}
