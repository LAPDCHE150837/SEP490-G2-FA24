package com.nihongo.sep490g2fa24.v1.services.impl;

import com.nihongo.sep490g2fa24.dtoMapper.VocabularyMapper;
import com.nihongo.sep490g2fa24.v1.dtos.course.VocabularyDTO;
import com.nihongo.sep490g2fa24.v1.model.User;
import com.nihongo.sep490g2fa24.v1.model.UserVocabulary;
import com.nihongo.sep490g2fa24.v1.model.Vocabulary;
import com.nihongo.sep490g2fa24.v1.repositories.UserRepository;
import com.nihongo.sep490g2fa24.v1.repositories.UserVocabularyRepository;
import com.nihongo.sep490g2fa24.v1.repositories.VocabularyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VocabularyService {
    private final VocabularyRepository vocabularyRepository;
    private final VocabularyMapper vocabularyMapper;
    private final UserVocabularyRepository userVocabularyRepository;
    private final UserRepository userRepository;

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
        return vocabularyRepository.save(vocabulary);
    }

    @Transactional
    public Vocabulary updateVocabulary(String id, Vocabulary vocabulary) {
        Vocabulary existingVocabulary = vocabularyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vocabulary not found"));

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

    public UserVocabulary addUserVocabulary(UserVocabulary userVocabulary, String username) {
        // Fetch the user by username or throw an exception if not found
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if the vocabulary already exists for the user
        Optional<UserVocabulary> existingUserVocabulary = userVocabularyRepository.findByUserAndVocabulary(user, userVocabulary.getVocabulary());

        if (existingUserVocabulary.isPresent()) {
            // If exists, toggle the status (true to false or false to true)
            UserVocabulary existing = existingUserVocabulary.get();
            existing.setIsLearning(!existing.getIsLearning());
            return userVocabularyRepository.save(existing); // Save and return the updated object
        } else {
            // If not exists, set the user and save it to the database
            userVocabulary.setUser(user);
            return userVocabularyRepository.save(userVocabulary);
        }
    }
}

