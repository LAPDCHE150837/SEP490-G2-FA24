package com.nihongo.sep490g2fa24.v1.services.impl;

import com.nihongo.sep490g2fa24.dtoMapper.TestMapper;
import com.nihongo.sep490g2fa24.v1.dtos.course.TestDTO;
import com.nihongo.sep490g2fa24.v1.model.Test;
import com.nihongo.sep490g2fa24.v1.repositories.TestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

// Services
@Service
@RequiredArgsConstructor
public class TestService {
    private final TestRepository testRepository;
    private final TestMapper testMapper;

    @Transactional(readOnly = true)
    public List<TestDTO> getAllTests() {
        return testRepository.findAll().stream()
                .map(testMapper::toDTO)
                .collect(Collectors.toList());

    }

    @Transactional(readOnly = true)
    public TestDTO getTestById(String id) {
        return testRepository.findById(id)
                .map(testMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Test not found"));
    }


    @Transactional
    public Test createTest(Test test) {
//        if(test.getLesson() == null || test.getLesson().getId().isEmpty()) {
//            throw new RuntimeException("Lesson id cannot be empty");
//        }
//        if(test.getTitle() == null || test.getTitle().isEmpty()) {
//            throw new RuntimeException("Title cannot be empty");
//        }
//        if (test.getDuration() == null) {
//            throw new RuntimeException("Duration cannot be empty");
//        }
//        if (test.getPassScore() == null) {
//            throw new RuntimeException("PassScore cannot be empty");
//        }

        return testRepository.save(test);
    }

    @Transactional
    public Test updateTest(String id, Test test) {
        Test existingTest = testRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Test not found"));
//
//        if(test.getLesson() == null || test.getLesson().getId().isEmpty()) {
//            throw new RuntimeException("Lesson id cannot be empty");
//        }
//        if(test.getTitle() == null || test.getTitle().isEmpty()) {
//            throw new RuntimeException("Title cannot be empty");
//        }
//        if (test.getDuration() == null) {
//            throw new RuntimeException("Duration cannot be empty");
//        }
//        if (test.getPassScore() == null) {
//            throw new RuntimeException("PassScore cannot be empty");
//        }

        existingTest.setTitle(test.getTitle());
        existingTest.setDescription(test.getDescription());
        existingTest.setDuration(test.getDuration());
        existingTest.setPassScore(test.getPassScore());

        return testRepository.save(existingTest);
    }

    @Transactional
    public void deleteTest(String id) {
        testRepository.deleteById(id);
    }
}
