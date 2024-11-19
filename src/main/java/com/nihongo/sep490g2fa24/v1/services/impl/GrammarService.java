package com.nihongo.sep490g2fa24.v1.services.impl;

import com.nihongo.sep490g2fa24.dtoMapper.GrammarMapper;
import com.nihongo.sep490g2fa24.v1.dtos.course.GrammarDTO;
import com.nihongo.sep490g2fa24.v1.model.Grammar;
import com.nihongo.sep490g2fa24.v1.repositories.GrammarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GrammarService {
    private final GrammarRepository grammarRepository;
    private final GrammarMapper grammarMapper;

    @Transactional(readOnly = true)
    public List<GrammarDTO> getAllGrammars() {
        return grammarRepository.findAll().stream()
                .map(grammarMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public GrammarDTO getGrammarById(String id) {
        return grammarRepository.findById(id)
                .map(grammarMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Grammar not found"));
    }

    @Transactional
    public Grammar createGrammar(Grammar grammar) {
        return grammarRepository.save(grammar);
    }

    @Transactional
    public Grammar updateGrammar(String id, Grammar grammar) {
        Grammar existingGrammar = grammarRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Grammar not found"));

        existingGrammar.setPattern(grammar.getPattern());
        existingGrammar.setMeaning(grammar.getMeaning());
        existingGrammar.setUsage(grammar.getUsage());
        existingGrammar.setExample(grammar.getExample());
        existingGrammar.setExampleReading(grammar.getExampleReading());
        existingGrammar.setExampleMeaning(grammar.getExampleMeaning());

        return grammarRepository.save(existingGrammar);
    }

    @Transactional
    public void deleteGrammar(String id) {
        grammarRepository.deleteById(id);
    }
}
