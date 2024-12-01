package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.v1.dtos.course.UserAnswerDTO;
import com.nihongo.sep490g2fa24.v1.model.UserAnswer;
import com.nihongo.sep490g2fa24.v1.services.impl.UserAnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user-answers")
@RequiredArgsConstructor
public class UserAnswerController {
    private final UserAnswerService userAnswerService;

    @GetMapping
    public ResponseEntity<List<UserAnswerDTO>> getAllUserAnswers() {
        return ResponseEntity.ok(userAnswerService.getAllUserAnswers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserAnswerDTO> getUserAnswerById(@PathVariable String id) {
        return ResponseEntity.ok(userAnswerService.getUserAnswerById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<UserAnswer> createUserAnswer(@RequestBody UserAnswer userAnswer) {
        return ResponseEntity.ok(userAnswerService.createUserAnswer(userAnswer));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserAnswer> updateUserAnswer(
            @PathVariable String id,
            @RequestBody UserAnswer userAnswer
    ) {
        return ResponseEntity.ok(userAnswerService.updateUserAnswer(id, userAnswer));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserAnswer(@PathVariable String id) {
        userAnswerService.deleteUserAnswer(id);
        return ResponseEntity.ok().build();
    }
}
