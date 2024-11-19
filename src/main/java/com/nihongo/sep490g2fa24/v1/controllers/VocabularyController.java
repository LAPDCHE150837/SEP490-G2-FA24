package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.v1.dtos.course.VocabularyDTO;
import com.nihongo.sep490g2fa24.v1.model.Vocabulary;
import com.nihongo.sep490g2fa24.v1.services.impl.VocabularyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/v1/vocabularies")
@RequiredArgsConstructor
public class VocabularyController {
    private final VocabularyService vocabularyService;

    @GetMapping
    public ResponseEntity<List<VocabularyDTO>> getAllVocabularies() {
        return ResponseEntity.ok(vocabularyService.getAllVocabularies());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VocabularyDTO> getVocabularyById(@PathVariable String id) {
        return ResponseEntity.ok(vocabularyService.getVocabularyById(id));
    }

    @PostMapping
    public ResponseEntity<Vocabulary> createVocabulary(@RequestBody Vocabulary vocabulary) {
        return ResponseEntity.ok(vocabularyService.createVocabulary(vocabulary));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vocabulary> updateVocabulary(@PathVariable String id, @RequestBody Vocabulary vocabulary) {
        return ResponseEntity.ok(vocabularyService.updateVocabulary(id, vocabulary));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVocabulary(@PathVariable String id) {
        vocabularyService.deleteVocabulary(id);
        return ResponseEntity.ok().build();
    }
}
