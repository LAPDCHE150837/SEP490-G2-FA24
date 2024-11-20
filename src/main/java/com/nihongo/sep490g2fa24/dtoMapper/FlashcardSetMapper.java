package com.nihongo.sep490g2fa24.dtoMapper;

import com.nihongo.sep490g2fa24.v1.dtos.course.FlashcardSetDTO;
import com.nihongo.sep490g2fa24.v1.model.FlashcardSet;
import com.nihongo.sep490g2fa24.v1.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class FlashcardSetMapper {
    private final FlashcardMapper flashcardMapper;

    public FlashcardSetDTO toDTO(FlashcardSet set) {
        if (set == null) return null;

        return FlashcardSetDTO.builder()
                .id(set.getId())
                .userId(set.getUser().getId())
                .title(set.getTitle())
                .description(set.getDescription())
                .category(set.getCategory())
                .totalCards(set.getTotalCards())
                .createdAt(set.getCreatedAt())
                .updatedAt(set.getUpdatedAt())
                .flashcards(set.getFlashcards().stream()
                        .map(flashcardMapper::toDTO)
                        .collect(Collectors.toList()))
                .build();
    }

    public FlashcardSet toEntity(FlashcardSetDTO dto, User user) {
        if (dto == null) return null;

        return FlashcardSet.builder()
                .user(user)
                .title(dto.getTitle())
                .description(dto.getDescription())
                .category(dto.getCategory())
                .totalCards(dto.getTotalCards())
                .build();
    }

    public void updateEntity(FlashcardSet set, FlashcardSetDTO dto) {
        if (dto == null) return;

        set.setTitle(dto.getTitle());
        set.setDescription(dto.getDescription());
        set.setCategory(dto.getCategory());
        set.setTotalCards(dto.getTotalCards());
    }
}
