package com.nihongo.sep490g2fa24.dtoMapper;

import com.nihongo.sep490g2fa24.v1.dtos.course.QuestionOptionDTO;
import com.nihongo.sep490g2fa24.v1.model.QuestionOption;
import com.nihongo.sep490g2fa24.v1.model.TestQuestion;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class QuestionOptionMapper {
    public QuestionOptionDTO toDTO(QuestionOption option) {
        if (option == null) return null;

        return QuestionOptionDTO.builder()
                .id(option.getId())
                .questionId(option.getQuestion().getId())
                .optionText(option.getOptionText())
                .isCorrect(option.getIsCorrect())
                .createdAt(option.getCreatedAt())
                .updatedAt(option.getUpdatedAt())
                .build();
    }

    public QuestionOption toEntity(QuestionOptionDTO dto, TestQuestion question) {
        if (dto == null) return null;

        return QuestionOption.builder()
                .question(question)
                .optionText(dto.getOptionText())
                .isCorrect(dto.getIsCorrect())
                .build();
    }

    public void updateEntity(QuestionOption option, QuestionOptionDTO dto) {
        if (dto == null) return;

        option.setOptionText(dto.getOptionText());
        option.setIsCorrect(dto.getIsCorrect());
    }
}
