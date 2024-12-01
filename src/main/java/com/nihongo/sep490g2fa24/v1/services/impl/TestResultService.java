package com.nihongo.sep490g2fa24.v1.services.impl;

import com.nihongo.sep490g2fa24.dtoMapper.TestResultMapper;
import com.nihongo.sep490g2fa24.v1.dtos.course.TestResultDTO;
import com.nihongo.sep490g2fa24.v1.model.TestResult;
import com.nihongo.sep490g2fa24.v1.model.User;
import com.nihongo.sep490g2fa24.v1.repositories.TestResultRepository;
import com.nihongo.sep490g2fa24.v1.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class TestResultService {
    private final TestResultRepository testResultRepository;
    private final TestResultMapper testResultMapper;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<TestResultDTO> getAllTestResults() {
        return testResultRepository.findAll().stream()
                .map(testResultMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TestResultDTO getTestResultById(String id) {
        return testResultRepository.findById(id)
                .map(testResultMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Test Result not found"));
    }

    @Transactional(readOnly = true)
    public List<TestResultDTO> getTestResultsByUserId(String userId) {
        return testResultRepository.findByUserId(userId).stream()
                .map(testResultMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public TestResult createTestResult(TestResult testResult, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        testResult.setUser(user);
        testResult.setCreatedAt(LocalDateTime.now());
        testResult.setCompletedAt(LocalDateTime.now());
        return testResultRepository.save(testResult);
    }



    @Transactional
    public TestResult updateTestResult(String id, TestResult testResult) {
        TestResult existingResult = testResultRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Test Result not found"));

        existingResult.setScore(testResult.getScore());
        existingResult.setTimeTaken(testResult.getTimeTaken());

        return testResultRepository.save(existingResult);
    }

    @Transactional
    public void deleteTestResult(String id) {
        testResultRepository.deleteById(id);
    }
}
