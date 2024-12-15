package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.v1.dtos.course.TestQuestionDTO;
import com.nihongo.sep490g2fa24.v1.model.TestQuestion;
import com.nihongo.sep490g2fa24.v1.services.impl.TestQuestionService;
import jakarta.servlet.http.HttpServletRequest;
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
    public BaseApiResponse<List<TestQuestionDTO>> getAllQuestions(HttpServletRequest request) {
        return BaseApiResponse.succeed(questionService.getAllQuestions(request.getRemoteUser()));
    }

    @GetMapping("/{id}")
    public BaseApiResponse<TestQuestionDTO> getQuestionById(@PathVariable String id) {
        return BaseApiResponse.succeed(questionService.getQuestionById(id));
    }

    @PostMapping
    public BaseApiResponse<TestQuestion> createQuestion(@RequestBody TestQuestion question) {
        return BaseApiResponse.succeed(questionService.createQuestion(question));
    }

    @PutMapping("/{id}")
    public BaseApiResponse<TestQuestion> updateQuestion(
            @PathVariable String id,
            @RequestBody TestQuestion question) {
        return BaseApiResponse.succeed(questionService.updateQuestion(id, question));
    }

    @DeleteMapping("/{id}")
    public BaseApiResponse<Void> deleteQuestion(@PathVariable String id) {
        questionService.deleteQuestion(id);
        return BaseApiResponse.succeed();
    }
}
