package com.nihongo.sep490g2fa24.dtoMapper;

import com.nihongo.sep490g2fa24.v1.dtos.course.FlashcardDTO;
import com.nihongo.sep490g2fa24.v1.model.Flashcard;
import com.nihongo.sep490g2fa24.v1.model.FlashcardSet;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FlashcardMapper {

    public FlashcardDTO toDTO(Flashcard card) {
        if (card == null) return null;

        return FlashcardDTO.builder()
                .id(card.getId())
                .setId(card.getSet().getId())
                .frontText(card.getFrontText())
                .frontType(card.getFrontType())
                .backReading(card.getBackReading())
                .backMeaning(card.getBackMeaning())
                .backExample(card.getBackExample())
                .reviewCount(card.getReviewCount())
                .nextReview(card.getNextReview())
                .easeFactor(card.getEaseFactor())
                .interval(card.getInterval())
                .createdAt(card.getCreatedAt())
                .updatedAt(card.getUpdatedAt())
                .build();
    }

    public Flashcard toEntity(FlashcardDTO dto, FlashcardSet set) {
        if (dto == null) return null;

        return Flashcard.builder()
                .set(set)
                .frontText(dto.getFrontText())
                .frontType(dto.getFrontType())
                .backReading(dto.getBackReading())
                .backMeaning(dto.getBackMeaning())
                .backExample(dto.getBackExample())
                .reviewCount(dto.getReviewCount())
                .nextReview(dto.getNextReview())
                .easeFactor(dto.getEaseFactor())
                .interval(dto.getInterval())
                .build();
    }

    public void updateEntity(Flashcard card, FlashcardDTO dto) {
        if (dto == null) return;

        card.setFrontText(dto.getFrontText());
        card.setFrontType(dto.getFrontType());
        card.setBackReading(dto.getBackReading());
        card.setBackMeaning(dto.getBackMeaning());
        card.setBackExample(dto.getBackExample());
        card.setReviewCount(dto.getReviewCount());
        card.setNextReview(dto.getNextReview());
        card.setEaseFactor(dto.getEaseFactor());
        card.setInterval(dto.getInterval());
    }
}

