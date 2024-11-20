package com.nihongo.sep490g2fa24.v1.services.impl;

import com.nihongo.sep490g2fa24.dtoMapper.FlashcardSetMapper;
import com.nihongo.sep490g2fa24.v1.dtos.course.FlashcardSetDTO;
import com.nihongo.sep490g2fa24.v1.model.FlashcardSet;
import com.nihongo.sep490g2fa24.v1.repositories.FlashcardSetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FlashcardSetService {
    private final FlashcardSetRepository setRepository;
    private final FlashcardSetMapper setMapper;

    @Transactional(readOnly = true)
    public List<FlashcardSetDTO> getAllSets() {
        return setRepository.findAll().stream()
                .map(setMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public FlashcardSetDTO getSetById(String id) {
        return setRepository.findById(id)
                .map(setMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Flashcard set not found"));
    }

    @Transactional
    public FlashcardSet createSet(FlashcardSet set) {
        return setRepository.save(set);
    }

    @Transactional
    public FlashcardSet updateSet(String id, FlashcardSet set) {
        FlashcardSet existingSet = setRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Flashcard set not found"));

        existingSet.setTitle(set.getTitle());
        existingSet.setDescription(set.getDescription());
        existingSet.setCategory(set.getCategory());
        existingSet.setTotalCards(set.getTotalCards());

        return setRepository.save(existingSet);
    }

    @Transactional
    public void deleteSet(String id) {
        setRepository.deleteById(id);
    }
}
