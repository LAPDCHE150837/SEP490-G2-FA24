package com.nihongo.sep490g2fa24.v1.services.impl;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.nihongo.sep490g2fa24.dtoMapper.TestResultMapper;
import com.nihongo.sep490g2fa24.v1.dtos.course.TestResultDTO;
import com.nihongo.sep490g2fa24.v1.model.*;
import com.nihongo.sep490g2fa24.v1.repositories.TestResultRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class TestResultServiceDiffblueTest {

    @Mock
    private TestResultMapper testResultMapper;

    @Mock
    private TestResultRepository testResultRepository;

    @Mock

    @InjectMocks
    private TestResultService testResultService;

    private TestResult mockTestResult;
    private TestResultDTO mockTestResultDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Mock TestResult
        Course course = new Course();
        course.setId("42");
        course.setTitle("Mock Course");

        Lesson lesson = new Lesson();
        lesson.setId("42");
        lesson.setCourse(course);

        com.nihongo.sep490g2fa24.v1.model.Test test = new com.nihongo.sep490g2fa24.v1.model.Test();
        test.setId("42");
        test.setLesson(lesson);

        User user = new User();
        user.setId("42");
        user.setUsername("MockUser");

        mockTestResult = new TestResult();
        mockTestResult.setId("42");
        mockTestResult.setTest(test);
        mockTestResult.setUser(user);
        mockTestResult.setCompletedAt(LocalDate.of(1970, 1, 1).atStartOfDay());

        // Mock TestResultDTO
        mockTestResultDTO = TestResultDTO.builder()
                .id("42")
                .score(42)
                .userId("42")
                .completedAt(LocalDateTime.of(1970, 1, 1, 0, 0))
                .build();
    }

    @Test
    @DisplayName("Test getTestResultById(String) - Valid Case")
    void testGetTestResultById_ValidCase() {
        // Arrange
        when(testResultRepository.findById("42")).thenReturn(Optional.of(mockTestResult));
        when(testResultMapper.toDTO(any(TestResult.class))).thenReturn(mockTestResultDTO);

        // Act
        TestResultDTO result = testResultService.getTestResultById("42");

        // Assert
        verify(testResultRepository).findById("42");
        verify(testResultMapper).toDTO(mockTestResult);

        assertNotNull(result);
        assertEquals("42", result.getId());
        assertEquals(42, result.getScore());
        assertEquals("42", result.getUserId());
        assertEquals("1970-01-01T00:00", result.getCompletedAt().toString());
    }

//    @Test
//    @DisplayName("Test getTestResultById(String) - Not Found")
//    void testGetTestResultById_NotFound() {
//        // Arrange
//        when(testResultRepository.findById("42")).thenReturn(Optional.empty());
//
//        // Act & Assert
//        RuntimeException exception = assertThrows(RuntimeException.class, () -> testResultService.getTestResultById("42"));
//        assertEquals("TestResult not found for id: 42", exception.getMessage());
//
//        verify(testResultRepository).findById("42");
//        verifyNoInteractions(testResultMapper);
//    }
}
