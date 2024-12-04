package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.v1.dtos.course.FlashcardDTO;
import com.nihongo.sep490g2fa24.v1.model.Flashcard;
import com.nihongo.sep490g2fa24.v1.services.impl.FlashcardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/flashcards")
@RequiredArgsConstructor
public class FlashcardController {
    private final FlashcardService flashcardService;

    @GetMapping
    public BaseApiResponse<List<FlashcardDTO>> getAllFlashcards() {
        return BaseApiResponse.succeed(flashcardService.getAllFlashcards());
    }

    @GetMapping("/{id}")
    public BaseApiResponse<FlashcardDTO> getFlashcardById(@PathVariable String id) {
        return BaseApiResponse.succeed(flashcardService.getFlashcardById(id));
    }

    @GetMapping("/a")
    public BaseApiResponse<List<FlashcardDTO>> getFlashcardInFlashcarSet(@RequestParam("setId") String id) {
        return BaseApiResponse.succeed(flashcardService.getFlashcardInFlashcarSet(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')  ")
    public BaseApiResponse<Flashcard> createFlashcard(@RequestBody Flashcard flashcard) {
        return BaseApiResponse.succeed(flashcardService.createFlashcard(flashcard));
    }

    @PutMapping("/{id}")
    public BaseApiResponse<Flashcard> updateFlashcard(@PathVariable String id, @RequestBody Flashcard flashcard) {
        return BaseApiResponse.succeed(flashcardService.updateFlashcard(id, flashcard));
    }
    @GetMapping("/not/{id}")
    public BaseApiResponse<List<FlashcardDTO>> getFlashcardIsNotMemoryById(@PathVariable String id) {
        return BaseApiResponse.succeed(flashcardService.getFlashcardIsNotMemoryById(id));
    }


    @PutMapping("/isMemoried/{id}")
    public BaseApiResponse<Flashcard> isMemoried(@PathVariable String id) {
        return BaseApiResponse.succeed(flashcardService.isMemoried(id));
    }

    @PutMapping("/isNotMemoried/{id}")
    public BaseApiResponse<Flashcard> isNotMemoried(@PathVariable String id) {
        return BaseApiResponse.succeed(flashcardService.isNotMemoried(id));
    }


    @DeleteMapping("/{id}")
    public BaseApiResponse<Void> deleteFlashcard(@PathVariable String id) {
        flashcardService.deleteFlashcard(id);
        return BaseApiResponse.succeed() ;
    }
}
