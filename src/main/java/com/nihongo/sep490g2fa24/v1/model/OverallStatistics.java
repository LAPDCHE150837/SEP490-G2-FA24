package com.nihongo.sep490g2fa24.v1.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class OverallStatistics {
    private List<QuestionStatistics> questionStats;
    private double totalIncorrectPercentage;
    private long totalCorrect;
    private long totalIncorrect;

    public double getTotalCorrectPercentage() {
        return 100.0 - totalIncorrectPercentage;
    }

    public long getTotalAnswers() {
        return totalCorrect + totalIncorrect;
    }
}
