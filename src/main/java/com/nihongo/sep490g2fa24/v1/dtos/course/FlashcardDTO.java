package com.nihongo.sep490g2fa24.v1.dtos.course;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FlashcardDTO {
    private String id;
    private String setId;
    private String frontText;
    private String frontType;
    private String backReading;
    private String backMeaning;
    private String backExample;
    private String backExampleReading;
    private Date createdAt;
    private Date updatedAt;
    private boolean memorized;
}