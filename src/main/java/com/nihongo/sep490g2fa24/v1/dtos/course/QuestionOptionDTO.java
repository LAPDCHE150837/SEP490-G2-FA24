package com.nihongo.sep490g2fa24.v1.dtos.course;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionOptionDTO {
    private String id;
    private String questionId;
    private String optionText;
    private Boolean isCorrect;
    private Date createdAt;
    private Date updatedAt;
}
