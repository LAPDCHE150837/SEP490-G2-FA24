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
public class UserAnswerDTO {
    private String id;
    private String testResultId;
    private String questionId;
    private String selectedOptionId;
    private Boolean isCorrect;
    private LocalDateTime createdAt;
}
