package com.nihongo.sep490g2fa24.v1.services.impl;

import com.nihongo.sep490g2fa24.dtoMapper.FlashcardSetMapper;
import com.nihongo.sep490g2fa24.v1.dtos.course.FlashcardSetDTO;
import com.nihongo.sep490g2fa24.v1.model.FlashcardSet;
import com.nihongo.sep490g2fa24.v1.model.User;
import com.nihongo.sep490g2fa24.v1.repositories.FlashcardSetRepository;
import com.nihongo.sep490g2fa24.v1.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FlashcardSetService {
    private final FlashcardSetRepository setRepository;
    private final FlashcardSetMapper setMapper;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<FlashcardSetDTO> getAllSets(String user) {
        User user1 = userRepository.findByUsername(user).orElseThrow(); ;
        return setRepository.findByUserId(user1.getId()).stream()
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
    public FlashcardSet createSet(FlashcardSet set, String req) {

        User user = userRepository.findByUsername(req).orElseThrow(() -> new RuntimeException("User not found")); ;
        set.setUser(user);

        if (set.getTitle() == null || set.getTitle().isEmpty()) {
            throw new RuntimeException("Title cannot be empty");
        }
        if (set.getDescription() == null || set.getDescription().isEmpty()) {
            throw new RuntimeException("Description cannot be empty");
        }
        if (set.getCategory() == null || set.getCategory().isEmpty()) {
            throw new RuntimeException("Category cannot be empty");
        }

        return setRepository.save(set);
    }

    @Transactional
    public FlashcardSet updateSet(String id, FlashcardSet set) {

        FlashcardSet existingSet = setRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Flashcard set not found"));

        if (set.getTitle() == null || set.getTitle().isEmpty()) {
            throw new RuntimeException("Title cannot be empty");
        }
        if (set.getDescription() == null || set.getDescription().isEmpty()) {
            throw new RuntimeException("Description cannot be empty");
        }
        if (set.getCategory() == null || set.getCategory().isEmpty()) {
            throw new RuntimeException("Category cannot be empty");
        }

        existingSet.setTitle(set.getTitle());
        existingSet.setDescription(set.getDescription());
        existingSet.setCategory(set.getCategory());
        existingSet.setUpdatedAt(LocalDateTime.now());
        return setRepository.save(existingSet);
    }

    @Transactional
    public void deleteSet(String id) {

        setRepository.deleteById(id);
    }
}
