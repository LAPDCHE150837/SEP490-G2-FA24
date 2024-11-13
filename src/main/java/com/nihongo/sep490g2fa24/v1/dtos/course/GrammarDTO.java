package com.nihongo.sep490g2fa24.v1.dtos.course;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GrammarDTO {
    private String id;
    private String pattern;
    private String meaning;
    private String grammarUsage;
    private String example;
    private String exampleReading;
    private String exampleMeaning;
}