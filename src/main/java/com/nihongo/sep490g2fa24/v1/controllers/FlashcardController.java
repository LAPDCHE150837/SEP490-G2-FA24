package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.v1.dtos.course.FlashcardDTO;
import com.nihongo.sep490g2fa24.v1.model.Flashcard;
import com.nihongo.sep490g2fa24.v1.services.impl.FlashcardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/flashcards")
@RequiredArgsConstructor
public class FlashcardController {
    private final FlashcardService flashcardService;

    @GetMapping
    public ResponseEntity<List<FlashcardDTO>> getAllFlashcards() {
        return ResponseEntity.ok(flashcardService.getAllFlashcards());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FlashcardDTO> getFlashcardById(@PathVariable String id) {
        return ResponseEntity.ok(flashcardService.getFlashcardById(id));
    }

    @PostMapping
    public ResponseEntity<Flashcard> createFlashcard(@RequestBody Flashcard flashcard) {
        return ResponseEntity.ok(flashcardService.createFlashcard(flashcard));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Flashcard> updateFlashcard(@PathVariable String id, @RequestBody Flashcard flashcard) {
        return ResponseEntity.ok(flashcardService.updateFlashcard(id, flashcard));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFlashcard(@PathVariable String id) {
        flashcardService.deleteFlashcard(id);
        return ResponseEntity.ok().build();
    }
}
