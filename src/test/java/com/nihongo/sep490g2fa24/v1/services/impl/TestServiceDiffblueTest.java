package com.nihongo.sep490g2fa24.v1.services.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.isA;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.nihongo.sep490g2fa24.dtoMapper.TestMapper;
import com.nihongo.sep490g2fa24.v1.dtos.course.TestDTO;
import com.nihongo.sep490g2fa24.v1.model.Course;
import com.nihongo.sep490g2fa24.v1.model.Lesson;
import com.nihongo.sep490g2fa24.v1.repositories.TestRepository;

import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.Optional;

import org.junit.jupiter.api.Disabled;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.repository.CrudRepository;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.aot.DisabledInAotMode;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ContextConfiguration(classes = {TestService.class})
@ExtendWith(SpringExtension.class)
@DisabledInAotMode
class TestServiceDiffblueTest {
    @MockBean
    private TestMapper testMapper;

    @MockBean
    private TestRepository testRepository;

    @Autowired
    private TestService testService;

    /**
     * Test {@link TestService#getAllTests()}.
     * <p>
     * Method under test: {@link TestService#getAllTests()}
     */
//    @org.junit.jupiter.api.Test
//    @DisplayName("Test getAllTests()")
//    @Disabled("TODO: Complete this test")
//    void testGetAllTests() {
//        // TODO: Diffblue Cover was only able to create a partial test for this method:
//        //   Reason: No inputs found that don't throw a trivial exception.
//        //   Diffblue Cover tried to run the arrange/act section, but the method under
//        //   test threw
//        //   java.lang.NullPointerException: Cannot invoke "java.util.Collection.stream()" because "that" is null
//        //       at com.nihongo.sep490g2fa24.v1.services.impl.TestService.getAllTests(TestService.java:23)
//        //   See https://diff.blue/R013 to resolve this issue.
//
//        // Arrange
//        when(testRepository.findAll()).thenReturn(null);
//
//        // Act
//        testService.getAllTests();
//    }

    /**
     * Test {@link TestService#getTestById(String)}.
     * <ul>
     *   <li>Given {@link TestRepository} {@link CrudRepository#findById(Object)}
     * return empty.</li>
     *   <li>Then throw {@link RuntimeException}.</li>
     * </ul>
     * <p>
     * Method under test: {@link TestService#getTestById(String)}
     */
    @org.junit.jupiter.api.Test
    @DisplayName("Test getTestById(String); given TestRepository findById(Object) return empty; then throw RuntimeException")
    void testGetTestById_givenTestRepositoryFindByIdReturnEmpty_thenThrowRuntimeException() {
        // Arrange
        Optional<com.nihongo.sep490g2fa24.v1.model.Test> emptyResult = Optional.empty();
        when(testRepository.findById(Mockito.<String>any())).thenReturn(emptyResult);

        // Act and Assert
        assertThrows(RuntimeException.class, () -> testService.getTestById("42"));
        verify(testRepository).findById(eq("42"));
    }

    /**
     * Test {@link TestService#getTestById(String)}.
     * <ul>
     *   <li>Then return Id is {@code 42}.</li>
     * </ul>
     * <p>
     * Method under test: {@link TestService#getTestById(String)}
     */
    @org.junit.jupiter.api.Test
    @DisplayName("Test getTestById(String); then return Id is '42'")
    void testGetTestById_thenReturnIdIs42() {
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
        lesson.setIsDeleted(true);
        lesson.setOrderIndex(1);
        lesson.setStatus(true);
        lesson.setTitle("Dr");
        lesson.setUpdatedAt(LocalDate.of(1970, 1, 1).atStartOfDay());
        lesson.setVideoUrl("https://example.org/example");

        com.nihongo.sep490g2fa24.v1.model.Test test = new com.nihongo.sep490g2fa24.v1.model.Test();
        test.setCreatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        test.setDescription("The characteristics of someone or something");
        test.setDuration(1);
        test.setId("42");
        test.setLesson(lesson);
        test.setPassScore(3);
        test.setTitle("Dr");
        test.setUpdatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        Optional<com.nihongo.sep490g2fa24.v1.model.Test> ofResult = Optional.of(test);
        when(testRepository.findById(Mockito.<String>any())).thenReturn(ofResult);
        TestDTO.TestDTOBuilder builderResult = TestDTO.builder();
        TestDTO.TestDTOBuilder titleResult = builderResult
                .createdAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()))
                .description("The characteristics of someone or something")
                .duration(1)
                .id("42")
                .lessonId("42")
                .passScore(3)
                .questions(null)
                .title("Dr");
        TestDTO buildResult = titleResult
                .updatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()))
                .build();
        when(testMapper.toDTO(Mockito.<com.nihongo.sep490g2fa24.v1.model.Test>any())).thenReturn(buildResult);

        // Act
        TestDTO actualTestById = testService.getTestById("42");

        // Assert
        verify(testMapper).toDTO(isA(com.nihongo.sep490g2fa24.v1.model.Test.class));
        verify(testRepository).findById(eq("42"));
        assertEquals("42", actualTestById.getId());
        assertEquals("42", actualTestById.getLessonId());
        assertEquals("Dr", actualTestById.getTitle());
        assertEquals("The characteristics of someone or something", actualTestById.getDescription());
        assertNull(actualTestById.getQuestions());
        assertEquals(1, actualTestById.getDuration().intValue());
        assertEquals(3, actualTestById.getPassScore().intValue());
    }

//    /**
//     * Test {@link TestService#createTest(Test)}.
//     * <p>
//     * Method under test:
//     * {@link TestService#createTest(com.nihongo.sep490g2fa24.v1.model.Test)}
//     */
    @org.junit.jupiter.api.Test
    @DisplayName("Test createTest(Test)")
    void testCreateTest() {
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
        lesson.setIsDeleted(true);
        lesson.setOrderIndex(1);
        lesson.setStatus(true);
        lesson.setTitle("Dr");
        lesson.setUpdatedAt(LocalDate.of(1970, 1, 1).atStartOfDay());
        lesson.setVideoUrl("https://example.org/example");

        com.nihongo.sep490g2fa24.v1.model.Test test = new com.nihongo.sep490g2fa24.v1.model.Test();
        test.setCreatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        test.setDescription("The characteristics of someone or something");
        test.setDuration(1);
        test.setId("42");
        test.setLesson(lesson);
        test.setPassScore(3);
        test.setTitle("Dr");
        test.setUpdatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        when(testRepository.save(Mockito.<com.nihongo.sep490g2fa24.v1.model.Test>any())).thenReturn(test);

        Course course2 = new Course();
        course2.setCreatedAt(LocalDate.of(1970, 1, 1).atStartOfDay());
        course2.setDescription("The characteristics of someone or something");
        course2.setId("42");
        course2.setImageUrl("https://example.org/example");
        course2.setLevel("Level");
        course2.setStatus(true);
        course2.setTitle("Dr");
        course2.setTotalLessons(1);
        course2.setUpdatedAt(LocalDate.of(1970, 1, 1).atStartOfDay());

        Lesson lesson2 = new Lesson();
        lesson2.setCourse(course2);
        lesson2.setCreatedAt(LocalDate.of(1970, 1, 1).atStartOfDay());
        lesson2.setDescription("The characteristics of someone or something");
        lesson2.setId("42");
        lesson2.setIsDeleted(true);
        lesson2.setOrderIndex(1);
        lesson2.setStatus(true);
        lesson2.setTitle("Dr");
        lesson2.setUpdatedAt(LocalDate.of(1970, 1, 1).atStartOfDay());
        lesson2.setVideoUrl("https://example.org/example");

        com.nihongo.sep490g2fa24.v1.model.Test test2 = new com.nihongo.sep490g2fa24.v1.model.Test();
        test2.setCreatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        test2.setDescription("The characteristics of someone or something");
        test2.setDuration(1);
        test2.setId("42");
        test2.setLesson(lesson2);
        test2.setPassScore(3);
        test2.setTitle("Dr");
        test2.setUpdatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));

        // Act
        com.nihongo.sep490g2fa24.v1.model.Test actualCreateTestResult = testService.createTest(test2);

        // Assert
        verify(testRepository).save(isA(com.nihongo.sep490g2fa24.v1.model.Test.class));
        assertSame(test, actualCreateTestResult);
    }

//    /**
//     * Test {@link TestService#updateTest(String, Test)}.
//     * <p>
//     * Method under test:
//     * {@link TestService#updateTest(String, com.nihongo.sep490g2fa24.v1.model.Test)}
//     */
    @org.junit.jupiter.api.Test
    @DisplayName("Test updateTest(String, Test)")
    void testUpdateTest() {
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
        lesson.setIsDeleted(true);
        lesson.setOrderIndex(1);
        lesson.setStatus(true);
        lesson.setTitle("Dr");
        lesson.setUpdatedAt(LocalDate.of(1970, 1, 1).atStartOfDay());
        lesson.setVideoUrl("https://example.org/example");

        com.nihongo.sep490g2fa24.v1.model.Test test = new com.nihongo.sep490g2fa24.v1.model.Test();
        test.setCreatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        test.setDescription("The characteristics of someone or something");
        test.setDuration(1);
        test.setId("42");
        test.setLesson(lesson);
        test.setPassScore(3);
        test.setTitle("Dr");
        test.setUpdatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        Optional<com.nihongo.sep490g2fa24.v1.model.Test> ofResult = Optional.of(test);

        Course course2 = new Course();
        course2.setCreatedAt(LocalDate.of(1970, 1, 1).atStartOfDay());
        course2.setDescription("The characteristics of someone or something");
        course2.setId("42");
        course2.setImageUrl("https://example.org/example");
        course2.setLevel("Level");
        course2.setStatus(true);
        course2.setTitle("Dr");
        course2.setTotalLessons(1);
        course2.setUpdatedAt(LocalDate.of(1970, 1, 1).atStartOfDay());

        Lesson lesson2 = new Lesson();
        lesson2.setCourse(course2);
        lesson2.setCreatedAt(LocalDate.of(1970, 1, 1).atStartOfDay());
        lesson2.setDescription("The characteristics of someone or something");
        lesson2.setId("42");
        lesson2.setIsDeleted(true);
        lesson2.setOrderIndex(1);
        lesson2.setStatus(true);
        lesson2.setTitle("Dr");
        lesson2.setUpdatedAt(LocalDate.of(1970, 1, 1).atStartOfDay());
        lesson2.setVideoUrl("https://example.org/example");

        com.nihongo.sep490g2fa24.v1.model.Test test2 = new com.nihongo.sep490g2fa24.v1.model.Test();
        test2.setCreatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        test2.setDescription("The characteristics of someone or something");
        test2.setDuration(1);
        test2.setId("42");
        test2.setLesson(lesson2);
        test2.setPassScore(3);
        test2.setTitle("Dr");
        test2.setUpdatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        when(testRepository.save(Mockito.<com.nihongo.sep490g2fa24.v1.model.Test>any())).thenReturn(test2);
        when(testRepository.findById(Mockito.<String>any())).thenReturn(ofResult);

        Course course3 = new Course();
        course3.setCreatedAt(LocalDate.of(1970, 1, 1).atStartOfDay());
        course3.setDescription("The characteristics of someone or something");
        course3.setId("42");
        course3.setImageUrl("https://example.org/example");
        course3.setLevel("Level");
        course3.setStatus(true);
        course3.setTitle("Dr");
        course3.setTotalLessons(1);
        course3.setUpdatedAt(LocalDate.of(1970, 1, 1).atStartOfDay());

        Lesson lesson3 = new Lesson();
        lesson3.setCourse(course3);
        lesson3.setCreatedAt(LocalDate.of(1970, 1, 1).atStartOfDay());
        lesson3.setDescription("The characteristics of someone or something");
        lesson3.setId("42");
        lesson3.setIsDeleted(true);
        lesson3.setOrderIndex(1);
        lesson3.setStatus(true);
        lesson3.setTitle("Dr");
        lesson3.setUpdatedAt(LocalDate.of(1970, 1, 1).atStartOfDay());
        lesson3.setVideoUrl("https://example.org/example");

        com.nihongo.sep490g2fa24.v1.model.Test test3 = new com.nihongo.sep490g2fa24.v1.model.Test();
        test3.setCreatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        test3.setDescription("The characteristics of someone or something");
        test3.setDuration(1);
        test3.setId("42");
        test3.setLesson(lesson3);
        test3.setPassScore(3);
        test3.setTitle("Dr");
        test3.setUpdatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));

        // Act
        com.nihongo.sep490g2fa24.v1.model.Test actualUpdateTestResult = testService.updateTest("42", test3);

        // Assert
        verify(testRepository).findById(eq("42"));
        verify(testRepository).save(isA(com.nihongo.sep490g2fa24.v1.model.Test.class));
        assertSame(test2, actualUpdateTestResult);
    }

    /**
     * Test {@link TestService#deleteTest(String)}.
     * <p>
     * Method under test: {@link TestService#deleteTest(String)}
     */
    @Test
    @DisplayName("Test deleteTest(String)")
    void testDeleteTest() {
        // Arrange
        doNothing().when(testRepository).deleteById(Mockito.<String>any());

        // Act
        testService.deleteTest("42");

        // Assert that nothing has changed
        verify(testRepository).deleteById(eq("42"));
    }
}
