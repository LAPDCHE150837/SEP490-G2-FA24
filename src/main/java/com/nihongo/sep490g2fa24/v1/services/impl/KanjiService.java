package com.nihongo.sep490g2fa24.v1.services.impl;

import com.nihongo.sep490g2fa24.dtoMapper.KanjiMapper;
import com.nihongo.sep490g2fa24.v1.dtos.course.KanjiDTO;
import com.nihongo.sep490g2fa24.v1.model.Kanji;
import com.nihongo.sep490g2fa24.v1.repositories.KanjiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class KanjiService {
    private final KanjiRepository kanjiRepository;
    private final KanjiMapper kanjiMapper;

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
        if (kanji.getCharacter() == null || kanji.getCharacter().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be null or empty");
        }
        if (kanji.getMeaning() == null || kanji.getMeaning().isEmpty()) {
            throw new IllegalArgumentException("Description cannot be null or empty");
        }
        return kanjiRepository.save(kanji);
    }

    @Transactional
    public Kanji updateKanji(String id, Kanji kanji) {
        Kanji existingKanji = kanjiRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kanji not found"));

        if (kanji.getCharacter() == null || kanji.getCharacter().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be null or empty");
        }
        if (kanji.getMeaning() == null || kanji.getMeaning().isEmpty()) {
            throw new IllegalArgumentException("Description cannot be null or empty");
        }

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
}
