package com.nihongo.sep490g2fa24.v1.dtos.course;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FlashcardSetDTO {
    private String id;
    private String userId;
    private String title;
    private String description;
    private String category;
    private Integer totalCards;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<FlashcardDTO> flashcards;
}
