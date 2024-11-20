package com.nihongo.sep490g2fa24.v1.services.impl;

import com.nihongo.sep490g2fa24.dtoMapper.FlashcardMapper;
import com.nihongo.sep490g2fa24.v1.dtos.course.FlashcardDTO;
import com.nihongo.sep490g2fa24.v1.model.Flashcard;
import com.nihongo.sep490g2fa24.v1.repositories.FlashcardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FlashcardService {
    private final FlashcardRepository flashcardRepository;
    private final FlashcardMapper flashcardMapper;

    @Transactional(readOnly = true)
    public List<FlashcardDTO> getAllFlashcards() {
        return flashcardRepository.findAll().stream()
                .map(flashcardMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public FlashcardDTO getFlashcardById(String id) {
        return flashcardRepository.findById(id)
                .map(flashcardMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Flashcard not found"));
    }

    @Transactional
    public Flashcard createFlashcard(Flashcard flashcard) {
        return flashcardRepository.save(flashcard);
    }

    @Transactional
    public Flashcard updateFlashcard(String id, Flashcard flashcard) {
        Flashcard existingCard = flashcardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Flashcard not found"));

        existingCard.setFrontText(flashcard.getFrontText());
        existingCard.setFrontType(flashcard.getFrontType());
        existingCard.setBackReading(flashcard.getBackReading());
        existingCard.setBackMeaning(flashcard.getBackMeaning());
        existingCard.setBackExample(flashcard.getBackExample());

        return flashcardRepository.save(existingCard);
    }

    @Transactional
    public void deleteFlashcard(String id) {
        flashcardRepository.deleteById(id);
    }
}
