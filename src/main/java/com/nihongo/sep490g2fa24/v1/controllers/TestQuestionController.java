package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.v1.dtos.course.TestQuestionDTO;
import com.nihongo.sep490g2fa24.v1.model.TestQuestion;
import com.nihongo.sep490g2fa24.v1.services.impl.TestQuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Controllers
@RestController
@RequestMapping("/api/v1/questions")
@RequiredArgsConstructor
public class TestQuestionController {
    private final TestQuestionService questionService;

    @GetMapping
    public ResponseEntity<List<TestQuestionDTO>> getAllQuestions() {
        return ResponseEntity.ok(questionService.getAllQuestions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TestQuestionDTO> getQuestionById(@PathVariable String id) {
        return ResponseEntity.ok(questionService.getQuestionById(id));
    }

    @PostMapping
    public ResponseEntity<TestQuestion> createQuestion(@RequestBody TestQuestion question) {
        return ResponseEntity.ok(questionService.createQuestion(question));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TestQuestion> updateQuestion(
            @PathVariable String id,
            @RequestBody TestQuestion question) {
        return ResponseEntity.ok(questionService.updateQuestion(id, question));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable String id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.ok().build();
    }
}
