package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.v1.dtos.course.QuestionOptionDTO;
import com.nihongo.sep490g2fa24.v1.model.QuestionOption;
import com.nihongo.sep490g2fa24.v1.services.impl.QuestionOptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/options")
@RequiredArgsConstructor
public class QuestionOptionController {
    private final QuestionOptionService optionService;

    @GetMapping
    public ResponseEntity<List<QuestionOptionDTO>> getAllOptions() {
        return ResponseEntity.ok(optionService.getAllOptions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuestionOptionDTO> getOptionById(@PathVariable String id) {
        return ResponseEntity.ok(optionService.getOptionById(id));
    }

    @PostMapping
    public ResponseEntity<QuestionOption> createOption(@RequestBody QuestionOption option) {
        return ResponseEntity.ok(optionService.createOption(option));
    }

    @PutMapping("/{id}")
    public ResponseEntity<QuestionOption> updateOption(
            @PathVariable String id,
            @RequestBody QuestionOption option) {
        return ResponseEntity.ok(optionService.updateOption(id, option));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOption(@PathVariable String id) {
        optionService.deleteOption(id);
        return ResponseEntity.ok().build();
    }
}
