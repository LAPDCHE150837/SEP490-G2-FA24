package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.v1.dtos.course.FlashcardSetDTO;
import com.nihongo.sep490g2fa24.v1.model.FlashcardSet;
import com.nihongo.sep490g2fa24.v1.services.impl.FlashcardSetService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/flashcard-sets")
@RequiredArgsConstructor
public class FlashcardSetController {
    private final FlashcardSetService setService;

    @GetMapping
    public BaseApiResponse<List<FlashcardSetDTO>> getAllSets() {
        return BaseApiResponse.succeed(setService.getAllSets());
    }

    @GetMapping("/{id}")
    public BaseApiResponse<FlashcardSetDTO> getSetById(@PathVariable String id) {
        return BaseApiResponse.succeed(setService.getSetById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')  ")
    public BaseApiResponse<FlashcardSet> createSet(@RequestBody FlashcardSet set, HttpServletRequest req) {
        return BaseApiResponse.succeed(setService.createSet(set,req.getRemoteUser()));
    }

    @PutMapping("/{id}")
    public BaseApiResponse<FlashcardSet> updateSet(@PathVariable String id, @RequestBody FlashcardSet set) {
        return BaseApiResponse.succeed(setService.updateSet(id, set));
    }

    @DeleteMapping("/{id}")
    public BaseApiResponse<Void> deleteSet(@PathVariable String id) {
        setService.deleteSet(id);
        return BaseApiResponse.succeed();
    }
}
