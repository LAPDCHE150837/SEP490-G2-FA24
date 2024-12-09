package com.nihongo.sep490g2fa24.v1.services.impl;

import com.nihongo.sep490g2fa24.dtoMapper.VocabularyMapper;
import com.nihongo.sep490g2fa24.v1.dtos.course.VocabularyDTO;
import com.nihongo.sep490g2fa24.v1.model.Vocabulary;
import com.nihongo.sep490g2fa24.v1.repositories.VocabularyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VocabularyService {
    private final VocabularyRepository vocabularyRepository;
    private final VocabularyMapper vocabularyMapper;

    @Transactional(readOnly = true)
    public List<VocabularyDTO> getAllVocabularies() {
        return vocabularyRepository.findAll().stream()
                .map(vocabularyMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public VocabularyDTO getVocabularyById(String id) {
        return vocabularyRepository.findById(id)
                .map(vocabularyMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Vocabulary not found"));
    }

    @Transactional
    public Vocabulary createVocabulary(Vocabulary vocabulary) {
        if (vocabulary.getLesson() == null) {
            throw new RuntimeException("Lesson cannot be null");
        }
        if (vocabulary.getWord() == null || vocabulary.getWord().isEmpty()) {
            throw new RuntimeException("Word cannot be null or empty");
        }
        if (vocabulary.getReading() == null || vocabulary.getReading().isEmpty()) {
            throw new RuntimeException("Reading cannot be null or empty");
        }
        if (vocabulary.getMeaning() == null || vocabulary.getMeaning().isEmpty()) {
            throw new RuntimeException("Meaning cannot be null or empty");
        }
        return vocabularyRepository.save(vocabulary);
    }

    @Transactional
    public Vocabulary updateVocabulary(String id, Vocabulary vocabulary) {
        Vocabulary existingVocabulary = vocabularyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vocabulary not found"));

        if (vocabulary.getWord() == null || vocabulary.getWord().isEmpty()) {
            throw new RuntimeException("Word cannot be null or empty");
        }
        if (vocabulary.getReading() == null || vocabulary.getReading().isEmpty()) {
            throw new RuntimeException("Reading cannot be null or empty");
        }
        if (vocabulary.getMeaning() == null || vocabulary.getMeaning().isEmpty()) {
            throw new RuntimeException("Meaning cannot be null or empty");
        }

        existingVocabulary.setWord(vocabulary.getWord());
        existingVocabulary.setReading(vocabulary.getReading());
        existingVocabulary.setMeaning(vocabulary.getMeaning());
        existingVocabulary.setExample(vocabulary.getExample());
        existingVocabulary.setExampleReading(vocabulary.getExampleReading());
        existingVocabulary.setExampleMeaning(vocabulary.getExampleMeaning());
        existingVocabulary.setImageUrl(vocabulary.getImageUrl());

        return vocabularyRepository.save(existingVocabulary);
    }

    @Transactional
    public void deleteVocabulary(String id) {
        vocabularyRepository.deleteById(id);
    }
}

