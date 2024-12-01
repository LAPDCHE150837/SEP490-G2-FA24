package com.nihongo.sep490g2fa24.dtoMapper;

import com.nihongo.sep490g2fa24.v1.dtos.course.UserAnswerDTO;
import com.nihongo.sep490g2fa24.v1.model.QuestionOption;
import com.nihongo.sep490g2fa24.v1.model.TestQuestion;
import com.nihongo.sep490g2fa24.v1.model.TestResult;
import com.nihongo.sep490g2fa24.v1.model.UserAnswer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserAnswerMapper {

    public UserAnswerDTO toDTO(UserAnswer userAnswer) {
        if (userAnswer == null) return null;

        return UserAnswerDTO.builder()
                .id(userAnswer.getId())
                .testResultId(userAnswer.getTestResult().getId())
                .questionId(userAnswer.getQuestion().getId())
                .selectedOptionId(userAnswer.getSelectedOption().getId())
                .isCorrect(userAnswer.getIsCorrect())
                .createdAt(userAnswer.getCreatedAt())
                .build();
    }

    public UserAnswer toEntity(UserAnswerDTO dto, TestResult testResult, TestQuestion question, QuestionOption selectedOption) {
        if (dto == null) return null;

        return UserAnswer.builder()
                .testResult(testResult)
                .question(question)
                .selectedOption(selectedOption)
                .isCorrect(dto.getIsCorrect())
                .createdAt(dto.getCreatedAt())
                .build();
    }

    public void updateEntity(UserAnswer userAnswer, UserAnswerDTO dto) {
        if (dto == null) return;

        userAnswer.setIsCorrect(dto.getIsCorrect());
    }
}
