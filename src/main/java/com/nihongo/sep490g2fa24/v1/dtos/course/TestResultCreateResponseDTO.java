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
public class TestResultCreateResponseDTO {
    private String id;
    private String userId;
    private String testId;
    private Integer score;
    private Integer timeTaken;
    private LocalDateTime completedAt;
    private LocalDateTime createdAt;
}
