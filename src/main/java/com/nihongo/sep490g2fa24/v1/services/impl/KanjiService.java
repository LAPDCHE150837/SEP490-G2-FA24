package com.nihongo.sep490g2fa24.v1.services.impl;

import com.nihongo.sep490g2fa24.dtoMapper.KanjiMapper;
import com.nihongo.sep490g2fa24.v1.dtos.course.KanjiDTO;
import com.nihongo.sep490g2fa24.v1.model.Kanji;
import com.nihongo.sep490g2fa24.v1.model.User;
import com.nihongo.sep490g2fa24.v1.model.UserKanji;
import com.nihongo.sep490g2fa24.v1.repositories.KanjiRepository;
import com.nihongo.sep490g2fa24.v1.repositories.UserKanjiRepository;
import com.nihongo.sep490g2fa24.v1.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class KanjiService {
    private final KanjiRepository kanjiRepository;
    private final KanjiMapper kanjiMapper;
    private final UserKanjiRepository userKanjiRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<KanjiDTO> getAllKanjis() {
        return kanjiRepository.findAll().stream()
                .map(kanjiMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public KanjiDTO getKanjiById(String id) {
        return kanjiRepository.findById(id)
                .map(kanjiMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Kanji not found"));
    }

    @Transactional
    public Kanji createKanji(Kanji kanji) {
        return kanjiRepository.save(kanji);
    }

    @Transactional
    public Kanji updateKanji(String id, Kanji kanji) {
        Kanji existingKanji = kanjiRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kanji not found"));

        existingKanji.setCharacter(kanji.getCharacter());
        existingKanji.setOnyomi(kanji.getOnyomi());
        existingKanji.setKunyomi(kanji.getKunyomi());
        existingKanji.setMeaning(kanji.getMeaning());
        existingKanji.setStrokeCount(kanji.getStrokeCount());
        existingKanji.setRadical(kanji.getRadical());
        existingKanji.setImageUrl(kanji.getImageUrl());

        return kanjiRepository.save(existingKanji);
    }

    @Transactional
    public void deleteKanji(String id) {
        kanjiRepository.deleteById(id);
    }

    public UserKanji addUserKanji(UserKanji userKanji, String username) {
        // Fetch the user by username or throw an exception if not found
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if the vocabulary already exists for the user
        Optional<UserKanji> existingUserKanji = userKanjiRepository.findByUserAndKanji(user, userKanji.getKanji());

        if (existingUserKanji.isPresent()) {
            // If exists, toggle the status (true to false or false to true)
            UserKanji existing = existingUserKanji.get();
            existing.setIsLearning(!existing.getIsLearning());
            return userKanjiRepository.save(existing); // Save and return the updated object
        } else {
            // If not exists, set the user and save it to the database
            userKanji.setUser(user);
            return userKanjiRepository.save(userKanji);
        }
    }
}