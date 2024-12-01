package com.nihongo.sep490g2fa24.dtoMapper;

import com.nihongo.sep490g2fa24.v1.model.TestResult;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;
@Component
@RequiredArgsConstructor
public class TestResultMapper {
    private final UserAnswerMapper userAnswerMapper;

    public TestResultDTO toDTO(TestResult testResult) {
        if (testResult == null) return null;

        return TestResultDTO.builder()
                .id(testResult.getId())
                .userId(testResult.getUser().getId())
                .testId(testResult.getTest().getId())
                .score(testResult.getScore())
                .timeTaken(testResult.getTimeTaken())
                .completedAt(testResult.getCompletedAt())
                .createdAt(testResult.getCreatedAt())
                .userAnswers(testResult.getUserAnswers().stream()
                        .map(userAnswerMapper::toDTO)
                        .collect(Collectors.toList()))
                .build();
    }

    public TestResult toEntity(TestResultDTO dto, User user, Test test) {
        if (dto == null) return null;

        return TestResult.builder()
                .user(user)
                .test(test)
                .score(dto.getScore())
                .timeTaken(dto.getTimeTaken())
                .completedAt(dto.getCompletedAt())
                .createdAt(dto.getCreatedAt())
                .build();
    }

    public void updateEntity(TestResult testResult, TestResultDTO dto) {
        if (dto == null) return;

        testResult.setScore(dto.getScore());
        testResult.setTimeTaken(dto.getTimeTaken());
        testResult.setCompletedAt(dto.getCompletedAt());
    }
}