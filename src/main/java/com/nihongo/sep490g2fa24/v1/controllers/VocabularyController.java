package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.v1.dtos.course.VocabularyDTO;
import com.nihongo.sep490g2fa24.v1.model.Vocabulary;
import com.nihongo.sep490g2fa24.v1.services.impl.VocabularyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/v1/vocabularies")
@RequiredArgsConstructor
public class VocabularyController {
    private final VocabularyService vocabularyService;

    @GetMapping
    public BaseApiResponse<List<VocabularyDTO>> getAllVocabularies() {
        return BaseApiResponse.succeed(vocabularyService.getAllVocabularies());
    }

    @GetMapping("/{id}")
    public BaseApiResponse<VocabularyDTO> getVocabularyById(@PathVariable String id) {
        return BaseApiResponse.succeed(vocabularyService.getVocabularyById(id));
    }

    @PostMapping
    public BaseApiResponse<Vocabulary> createVocabulary(@RequestBody Vocabulary vocabulary) {
        return BaseApiResponse.succeed(vocabularyService.createVocabulary(vocabulary));
    }

    @PutMapping("/{id}")
    public BaseApiResponse<Vocabulary> updateVocabulary(@PathVariable String id, @RequestBody Vocabulary vocabulary) {
        return BaseApiResponse.succeed(vocabularyService.updateVocabulary(id, vocabulary));
    }

    @DeleteMapping("/{id}")
    public BaseApiResponse<Void> deleteVocabulary(@PathVariable String id) {
        vocabularyService.deleteVocabulary(id);
        return BaseApiResponse.succeed();
    }
}
