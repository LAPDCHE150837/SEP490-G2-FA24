package com.nihongo.sep490g2fa24.v1.dtos.course;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VocabularyDTO {
    private String id;
    private String word;
    private String reading;
    private String meaning;
    private String example;
    private String exampleReading;
    private String exampleMeaning;
    private String imageUrl;

}