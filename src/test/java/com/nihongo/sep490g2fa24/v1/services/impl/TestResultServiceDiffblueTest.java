package com.nihongo.sep490g2fa24.v1.services.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.isA;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.nihongo.sep490g2fa24.dtoMapper.TestResultMapper;
import com.nihongo.sep490g2fa24.v1.dtos.course.TestResultDTO;
import com.nihongo.sep490g2fa24.v1.dtos.users.Role;
import com.nihongo.sep490g2fa24.v1.model.Course;
import com.nihongo.sep490g2fa24.v1.model.Lesson;
import com.nihongo.sep490g2fa24.v1.model.TestResult;
import com.nihongo.sep490g2fa24.v1.model.User;
import com.nihongo.sep490g2fa24.v1.repositories.TestResultRepository;
import com.nihongo.sep490g2fa24.v1.repositories.UserRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.aot.DisabledInAotMode;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ContextConfiguration(classes = {TestResultService.class})
@ExtendWith(SpringExtension.class)
@DisabledInAotMode
class TestResultServiceDiffblueTest {
    @MockBean
    private TestResultMapper testResultMapper;

    @MockBean
    private TestResultRepository testResultRepository;

    @Autowired
    private TestResultService testResultService;

    @MockBean
    private UserRepository userRepository;

    /**
     * Test {@link TestResultService#getTestResultById(String)}.
     * <ul>
     *   <li>Then return CompletedAt toLocalTime toString is {@code 00:00}.</li>
     * </ul>
     * <p>
     * Method under test: {@link TestResultService#getTestResultById(String)}
     */
    @org.junit.jupiter.api.Test
    @DisplayName("Test getTestResultById(String); then return CompletedAt toLocalTime toString is '00:00'")
    void testGetTestResultById_thenReturnCompletedAtToLocalTimeToStringIs0000() {
        // Arrange
        Course course = new Course();
        course.setCreatedAt(LocalDate.of(1970, 1, 1).atStartOfDay());
        course.setDescription("The characteristics of someone or something");
        course.setId("42");
        course.setImageUrl("https://example.org/example");
        course.setLevel("Level");
        course.setStatus(true);
        course.setTitle("Dr");
        course.setTotalLessons(1);
        course.setUpdatedAt(LocalDate.of(1970, 1, 1).atStartOfDay());

        Lesson lesson = new Lesson();
        lesson.setCourse(course);
        lesson.setCreatedAt(LocalDate.of(1970, 1, 1).atStartOfDay());
        lesson.setDescription("The characteristics of someone or something");
        lesson.setId("42");
        lesson.setOrderIndex(1);
        lesson.setStatus(true);
        lesson.setTitle("Dr");
        lesson.setUpdatedAt(LocalDate.of(1970, 1, 1).atStartOfDay());

        com.nihongo.sep490g2fa24.v1.model.Test test = new com.nihongo.sep490g2fa24.v1.model.Test();
        test.setCreatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        test.setDescription("The characteristics of someone or something");
        test.setDuration(1);
        test.setId("42");
        test.setLesson(lesson);
        test.setPassScore(3);
        test.setTitle("Dr");
        test.setUpdatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));

        User user = new User();
        user.setCreatedAt(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant());
        user.setEmail("jane.doe@example.org");
        user.setFlagActive("Flag Active");
        user.setId("42");
        user.setPassword("iloveyou");
        user.setRole(Role.USER);
        user.setUpdatedAt(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant());
        user.setUsername("janedoe");

        TestResult testResult = new TestResult();
        testResult.setCompletedAt(LocalDate.of(1970, 1, 1).atStartOfDay());
        testResult.setCreatedAt(LocalDate.of(1970, 1, 1).atStartOfDay());
        testResult.setId("42");
        testResult.setScore(3);
        testResult.setTest(test);
        testResult.setTimeTaken(1);
        testResult.setUser(user);
        Optional<TestResult> ofResult = Optional.of(testResult);
        when(testResultRepository.findById(Mockito.<String>any())).thenReturn(ofResult);
        TestResultDTO.TestResultDTOBuilder builderResult = TestResultDTO.builder();
        LocalDate ofResult2 = LocalDate.of(1970, 1, 1);
        TestResultDTO.TestResultDTOBuilder completedAtResult = builderResult.completedAt(ofResult2.atStartOfDay());
        LocalDate ofResult3 = LocalDate.of(1970, 1, 1);
        TestResultDTO buildResult = completedAtResult.createdAt(ofResult3.atStartOfDay())
                .id("42")
                .score(3)
                .testId("42")
                .timeTaken(1)
                .userAnswers(null)
                .userId("42")
                .build();
        when(testResultMapper.toDTO(Mockito.<TestResult>any())).thenReturn(buildResult);

        // Act
        TestResultDTO actualTestResultById = testResultService.getTestResultById("42");

        // Assert
        verify(testResultMapper).toDTO(isA(TestResult.class));
        verify(testResultRepository).findById(eq("42"));
        LocalDateTime completedAt = actualTestResultById.getCompletedAt();
        LocalTime toLocalTimeResult = completedAt.toLocalTime();
        assertEquals("00:00", toLocalTimeResult.toString());
        LocalDate toLocalDateResult = completedAt.toLocalDate();
        assertEquals("1970-01-01", toLocalDateResult.toString());
        LocalDateTime createdAt = actualTestResultById.getCreatedAt();
        LocalDate toLocalDateResult2 = createdAt.toLocalDate();
        assertEquals("1970-01-01", toLocalDateResult2.toString());
        assertEquals("42", actualTestResultById.getId());
        assertEquals("42", actualTestResultById.getTestId());
        assertEquals("42", actualTestResultById.getUserId());
        assertNull(actualTestResultById.getUserAnswers());
        assertEquals(1, actualTestResultById.getTimeTaken().intValue());
        assertEquals(3, actualTestResultById.getScore().intValue());
        assertSame(toLocalTimeResult, createdAt.toLocalTime());
        assertSame(ofResult2, toLocalDateResult);
        assertSame(ofResult3, toLocalDateResult2);
    }

    /**
     * Test {@link TestResultService#getTestResultById(String)}.
     * <ul>
     *   <li>Then throw {@link RuntimeException}.</li>
     * </ul>
     * <p>
     * Method under test: {@link TestResultService#getTestResultById(String)}
     */
    @Test
    @DisplayName("Test getTestResultById(String); then throw RuntimeException")
    void testGetTestResultById_thenThrowRuntimeException() {
        // Arrange
        Optional<TestResult> emptyResult = Optional.empty();
        when(testResultRepository.findById(Mockito.<String>any())).thenReturn(emptyResult);

        // Act and Assert
        assertThrows(RuntimeException.class, () -> testResultService.getTestResultById("42"));
        verify(testResultRepository).findById(eq("42"));
    }
}
