package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.v1.dtos.course.TestResultCreateResponseDTO;
import com.nihongo.sep490g2fa24.v1.dtos.course.TestResultDTO;
import com.nihongo.sep490g2fa24.v1.model.TestResult;
import com.nihongo.sep490g2fa24.v1.services.impl.TestResultService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/test-results")
@RequiredArgsConstructor

public class TestResultController {
    private final TestResultService testResultService;

    @GetMapping
    public ResponseEntity<List<TestResultDTO>> getAllTestResults() {
        return ResponseEntity.ok(testResultService.getAllTestResults());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TestResultDTO> getTestResultById(@PathVariable String id) {
        return ResponseEntity.ok(testResultService.getTestResultById(id));
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<TestResultDTO>> getTestResultsByUserId(HttpServletRequest req) {
        return ResponseEntity.ok(testResultService.getTestResultsByUserId(req.getRemoteUser()));
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<TestResultCreateResponseDTO> createTestResult(@RequestBody TestResult testResult, HttpServletRequest request) {
        TestResult created = testResultService.createTestResult(testResult, request.getRemoteUser());
        return ResponseEntity.ok(toCreateResponseDTO(created));
    }
    private TestResultCreateResponseDTO toCreateResponseDTO(TestResult testResult) {
        return TestResultCreateResponseDTO.builder()
                .id(testResult.getId())
                .userId(testResult.getUser().getId())
                .testId(testResult.getTest().getId())
                .score(testResult.getScore())
                .timeTaken(testResult.getTimeTaken())
                .completedAt(testResult.getCompletedAt())
                .createdAt(testResult.getCreatedAt())
                .build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<TestResult> updateTestResult(
            @PathVariable String id,
            @RequestBody TestResult testResult
    ) {
        return ResponseEntity.ok(testResultService.updateTestResult(id, testResult));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTestResult(@PathVariable String id) {
        testResultService.deleteTestResult(id);
        return ResponseEntity.ok().build();
    }
}
