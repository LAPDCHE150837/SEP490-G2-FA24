package com.nihongo.sep490g2fa24.v1.repositories;

import com.nihongo.sep490g2fa24.v1.model.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TestResultRepository extends JpaRepository<TestResult, String> {
    List<TestResult> findByUserId(String userId);
    List<TestResult> findByTestId(String testId);
}
