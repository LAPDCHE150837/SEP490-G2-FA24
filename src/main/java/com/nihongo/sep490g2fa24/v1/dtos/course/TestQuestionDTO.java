package com.nihongo.sep490g2fa24.v1.dtos.course;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TestQuestionDTO {
    private String id;
    private String testId;
    private String questionType;
    private String questionText;
    private String questionTranslation;
    private String correctAnswer;
    private String explanation;
    private Date createdAt;
    private Date updatedAt;
    private List<QuestionOptionDTO> options;
}
