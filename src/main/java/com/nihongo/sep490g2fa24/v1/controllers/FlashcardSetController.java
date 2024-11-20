package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.v1.dtos.course.FlashcardSetDTO;
import com.nihongo.sep490g2fa24.v1.model.FlashcardSet;
import com.nihongo.sep490g2fa24.v1.services.impl.FlashcardSetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/flashcard-sets")
@RequiredArgsConstructor
public class FlashcardSetController {
    private final FlashcardSetService setService;

    @GetMapping
    public ResponseEntity<List<FlashcardSetDTO>> getAllSets() {
        return ResponseEntity.ok(setService.getAllSets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FlashcardSetDTO> getSetById(@PathVariable String id) {
        return ResponseEntity.ok(setService.getSetById(id));
    }

    @PostMapping
    public ResponseEntity<FlashcardSet> createSet(@RequestBody FlashcardSet set) {
        return ResponseEntity.ok(setService.createSet(set));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FlashcardSet> updateSet(@PathVariable String id, @RequestBody FlashcardSet set) {
        return ResponseEntity.ok(setService.updateSet(id, set));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSet(@PathVariable String id) {
        setService.deleteSet(id);
        return ResponseEntity.ok().build();
    }
}
