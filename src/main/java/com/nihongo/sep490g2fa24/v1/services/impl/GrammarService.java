package com.nihongo.sep490g2fa24.v1.services.impl;

import com.nihongo.sep490g2fa24.dtoMapper.GrammarMapper;
import com.nihongo.sep490g2fa24.v1.dtos.course.GrammarDTO;
import com.nihongo.sep490g2fa24.v1.model.Grammar;
import com.nihongo.sep490g2fa24.v1.model.User;
import com.nihongo.sep490g2fa24.v1.model.UserGrammar;
import com.nihongo.sep490g2fa24.v1.repositories.GrammarRepository;
import com.nihongo.sep490g2fa24.v1.repositories.UserGrammarRepository;
import com.nihongo.sep490g2fa24.v1.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GrammarService {
    private final GrammarRepository grammarRepository;
    private final GrammarMapper grammarMapper;
    private final UserGrammarRepository userGrammarRepository;
    private final UserRepository userRepository;

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
        existingGrammar.setImageUrl(grammar.getImageUrl());

        return grammarRepository.save(existingGrammar);
    }

    @Transactional
    public void deleteGrammar(String id) {
        grammarRepository.deleteById(id);
    }

    public UserGrammar addUserGrammar(UserGrammar userGrammar,String username) {
        // Fetch the user by username or throw an exception if not found
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if the vocabulary already exists for the user
        Optional<UserGrammar> existingUserGrammar = userGrammarRepository.findByUserAndGrammar(user, userGrammar.getGrammar());

        if (existingUserGrammar.isPresent()) {
            // If exists, toggle the status (true to false or false to true)
            UserGrammar existing = existingUserGrammar.get();
            existing.setIsLearning(!existing.getIsLearning());
            return userGrammarRepository.save(existing); // Save and return the updated object
        } else {
            // If not exists, set the user and save it to the database
            userGrammar.setUser(user);
            return userGrammarRepository.save(userGrammar);
        }
    }
}
