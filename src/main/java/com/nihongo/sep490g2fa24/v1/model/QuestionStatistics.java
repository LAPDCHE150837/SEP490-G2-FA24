package com.nihongo.sep490g2fa24.v1.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class QuestionStatistics {
    private String questionId;
    private String questionName;
    private double incorrectPercentage;
    private long totalCorrect;
    private long totalIncorrect;

    public double getCorrectPercentage() {
        return 100.0 - incorrectPercentage;
    }

    public long getTotalAnswers() {
        return totalCorrect + totalIncorrect;
    }
}