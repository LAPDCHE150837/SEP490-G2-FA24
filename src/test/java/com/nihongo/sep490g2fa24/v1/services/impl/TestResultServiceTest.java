package com.nihongo.sep490g2fa24.v1.services.impl;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


import com.nihongo.sep490g2fa24.dtoMapper.TestResultMapper;
import com.nihongo.sep490g2fa24.v1.dtos.course.TestResultDTO;
import com.nihongo.sep490g2fa24.v1.model.TestResult;
import com.nihongo.sep490g2fa24.v1.model.User;
import com.nihongo.sep490g2fa24.v1.repositories.TestResultRepository;
import com.nihongo.sep490g2fa24.v1.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

class TestResultServiceTest {

    @Mock
    private TestResultRepository testResultRepository;

    @Mock
    private TestResultMapper testResultMapper;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private TestResultService testResultService;

    private TestResult mockTestResult;
    private TestResultDTO mockTestResultDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Mock TestResult
        mockTestResult = new TestResult();
        mockTestResult.setId("42");
        mockTestResult.setScore(95);
        mockTestResult.setTimeTaken(60);
        mockTestResult.setCreatedAt(LocalDateTime.now());
        mockTestResult.setCompletedAt(LocalDateTime.now());

        // Mock TestResultDTO
        mockTestResultDTO = TestResultDTO.builder()
                .id("42")
                .score(95)
                .timeTaken(60)
                .build();
    }

    @Test
    @DisplayName("Test getAllTestResults() - Valid Case")
    void testGetAllTestResults() {
        // Arrange
        List<TestResult> testResults = new ArrayList<>();
        testResults.add(mockTestResult);
        when(testResultRepository.findAll()).thenReturn(testResults);
        when(testResultMapper.toDTO(mockTestResult)).thenReturn(mockTestResultDTO);

        // Act
        List<TestResultDTO> result = testResultService.getAllTestResults();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("42", result.get(0).getId());
        verify(testResultRepository).findAll();
    }

    @Test
    @DisplayName("Test getTestResultById() - Valid Case")
    void testGetTestResultById() {

        // Arrange

        when(testResultRepository.findById("42")).thenReturn(Optional.of(mockTestResult));
        when(testResultMapper.toDTO(mockTestResult)).thenReturn(mockTestResultDTO);

        // Act

        TestResultDTO result = testResultService.getTestResultById("42");

        // Assert

        assertNotNull(result);
        assertEquals("42", result.getId());
        verify(testResultRepository).findById("42");
    }

    @Test
    @DisplayName("Test getTestResultById() - Not Found")
    void testGetTestResultById_NotFound() {

        // Arrange

        when(testResultRepository.findById("42")).thenReturn(Optional.empty());

        // Act & Assert

        RuntimeException exception = assertThrows(RuntimeException.class, () -> testResultService.getTestResultById("42"));
        assertEquals("Test Result not found", exception.getMessage());
        verify(testResultRepository).findById("42");
    }

    @Test
    @DisplayName("Test getTestResultsByUserId() - Valid Case")
    void testGetTestResultsByUserId() {

        // Arrange

        List<TestResult> testResults = new ArrayList<>();
        testResults.add(mockTestResult);
        when(testResultRepository.findByUserId("42")).thenReturn(testResults);
        when(testResultMapper.toDTO(mockTestResult)).thenReturn(mockTestResultDTO);

        // Act

        List<TestResultDTO> result = testResultService.getTestResultsByUserId("42");

        // Assert

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(testResultRepository).findByUserId("42");
    }

    @Test
    @DisplayName("Test createTestResult() - Valid Case")
    void testCreateTestResult() {
        // Arrange
        User mockUser = new User();
        mockUser.setId("42");
        mockUser.setUsername("TestUser");

        when(userRepository.findByUsername("TestUser")).thenReturn(Optional.of(mockUser));
        when(testResultRepository.save(mockTestResult)).thenReturn(mockTestResult);

        // Act
        TestResult result = testResultService.createTestResult(mockTestResult, "TestUser");

        // Assert
        assertNotNull(result);
        assertEquals("42", result.getId());
        verify(userRepository).findByUsername("TestUser");
        verify(testResultRepository).save(mockTestResult);
    }

    @Test
    @DisplayName("Test updateTestResult() - Valid Case")
    void testUpdateTestResult() {


        // Arrange

        when(testResultRepository.findById("42")).thenReturn(Optional.of(mockTestResult));
        when(testResultRepository.save(mockTestResult)).thenReturn(mockTestResult);

        TestResult updatedTestResult = new TestResult();
        updatedTestResult.setScore(100);
        updatedTestResult.setTimeTaken(50);

        // Act

        TestResult result = testResultService.updateTestResult("42", updatedTestResult);

        // Assert

        assertNotNull(result);
        assertEquals(100, result.getScore());
        assertEquals(50, result.getTimeTaken());
        verify(testResultRepository).findById("42");
        verify(testResultRepository).save(mockTestResult);
    }

    @Test
    @DisplayName("Test deleteTestResult() - Valid Case")
    void testDeleteTestResult() {
        // Act

        testResultService.deleteTestResult("42");

        // Assert

        verify(testResultRepository).deleteById("42");
    }
}

