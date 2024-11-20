package com.nihongo.sep490g2fa24.dtoMapper;

import com.nihongo.sep490g2fa24.v1.dtos.course.TestQuestionDTO;
import com.nihongo.sep490g2fa24.v1.model.Test;
import com.nihongo.sep490g2fa24.v1.model.TestQuestion;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class TestQuestionMapper {
    private final QuestionOptionMapper optionMapper;

    public TestQuestionDTO toDTO(TestQuestion question) {
        if (question == null) return null;

        return TestQuestionDTO.builder()
                .id(question.getId())
                .testId(question.getTest().getId())
                .questionType(question.getQuestionType())
                .questionText(question.getQuestionText())
                .questionTranslation(question.getQuestionTranslation())
                .correctAnswer(question.getCorrectAnswer())
                .explanation(question.getExplanation())
                .createdAt(question.getCreatedAt())
                .updatedAt(question.getUpdatedAt())
                .options(question.getOptions().stream()
                        .map(optionMapper::toDTO)
                        .collect(Collectors.toList()))
                .build();
    }

    public TestQuestion toEntity(TestQuestionDTO dto, Test test) {
        if (dto == null) return null;

        return TestQuestion.builder()
                .test(test)
                .questionType(dto.getQuestionType())
                .questionText(dto.getQuestionText())
                .questionTranslation(dto.getQuestionTranslation())
                .correctAnswer(dto.getCorrectAnswer())
                .explanation(dto.getExplanation())
                .build();
    }

    public void updateEntity(TestQuestion question, TestQuestionDTO dto) {
        if (dto == null) return;

        question.setQuestionType(dto.getQuestionType());
        question.setQuestionText(dto.getQuestionText());
        question.setQuestionTranslation(dto.getQuestionTranslation());
        question.setCorrectAnswer(dto.getCorrectAnswer());
        question.setExplanation(dto.getExplanation());
    }
}
