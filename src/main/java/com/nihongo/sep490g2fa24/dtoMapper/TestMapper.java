package com.nihongo.sep490g2fa24.dtoMapper;

import com.nihongo.sep490g2fa24.v1.dtos.course.TestDTO;
import com.nihongo.sep490g2fa24.v1.model.Lesson;
import com.nihongo.sep490g2fa24.v1.model.Test;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

// TestMapper.java
@Component
@RequiredArgsConstructor
public class TestMapper {
    private final TestQuestionMapper questionMapper;

    public TestDTO toDTO(Test test) {
        if (test == null) return null;

        return TestDTO.builder()
                .id(test.getId())
                .lessonId(test.getLesson().getId())
                .title(test.getTitle())
                .description(test.getDescription())
                .duration(test.getDuration())
                .passScore(test.getPassScore())
                .createdAt(test.getCreatedAt())
                .updatedAt(test.getUpdatedAt())
                .questions(test.getQuestions().stream()
                        .map(questionMapper::toDTO)
                        .collect(Collectors.toList()))
                .build();
    }

    public Test toEntity(TestDTO dto, Lesson lesson) {
        if (dto == null) return null;

        return Test.builder()
                .lesson(lesson)
                .title(dto.getTitle())
                .description(dto.getDescription())
                .duration(dto.getDuration())
                .passScore(dto.getPassScore())
                .build();
    }

    public void updateEntity(Test test, TestDTO dto) {
        if (dto == null) return;

        test.setTitle(dto.getTitle());
        test.setDescription(dto.getDescription());
        test.setDuration(dto.getDuration());
        test.setPassScore(dto.getPassScore());
    }
}
