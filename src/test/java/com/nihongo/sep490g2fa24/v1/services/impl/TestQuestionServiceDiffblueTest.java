package com.nihongo.sep490g2fa24.v1.services.impl;

import static org.junit.jupiter.api.Assertions.assertSame;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.isA;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.nihongo.sep490g2fa24.dtoMapper.TestQuestionMapper;
import com.nihongo.sep490g2fa24.v1.model.Course;
import com.nihongo.sep490g2fa24.v1.model.Lesson;
import com.nihongo.sep490g2fa24.v1.model.TestQuestion;
import com.nihongo.sep490g2fa24.v1.repositories.TestQuestionRepository;

import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.aot.DisabledInAotMode;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ContextConfiguration(classes = {TestQuestionService.class})
@ExtendWith(SpringExtension.class)
@DisabledInAotMode

class TestQuestionServiceDiffblueTest {
    @MockBean
    private TestQuestionMapper testQuestionMapper;

    @MockBean
    private TestQuestionRepository testQuestionRepository;

    @Autowired
    private TestQuestionService testQuestionService;

    /**
     * Test {@link TestQuestionService#updateQuestion(String, TestQuestion)}.
     * <p>
     * Method under test:
     * {@link TestQuestionService#updateQuestion(String, TestQuestion)}
     */

    @org.junit.jupiter.api.Test
    @DisplayName("Test updateQuestion(String, TestQuestion)")
    void testUpdateQuestion() {

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

        TestQuestion testQuestion = new TestQuestion();
        testQuestion.setCorrectAnswer("Correct Answer");
        testQuestion.setCreatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        testQuestion.setExplanation("Explanation");
        testQuestion.setId("42");
        testQuestion.setQuestionText("Question Text");
        testQuestion.setQuestionTranslation("Question Translation");
        testQuestion.setQuestionType("Question Type");
        testQuestion.setTest(test);
        testQuestion.setUpdatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        Optional<TestQuestion> ofResult = Optional.of(testQuestion);

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
        lesson2.setOrderIndex(1);
        lesson2.setStatus(true);
        lesson2.setTitle("Dr");
        lesson2.setUpdatedAt(LocalDate.of(1970, 1, 1).atStartOfDay());

        com.nihongo.sep490g2fa24.v1.model.Test test2 = new com.nihongo.sep490g2fa24.v1.model.Test();
        test2.setCreatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        test2.setDescription("The characteristics of someone or something");
        test2.setDuration(1);
        test2.setId("42");
        test2.setLesson(lesson2);
        test2.setPassScore(3);
        test2.setTitle("Dr");
        test2.setUpdatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));

        TestQuestion testQuestion2 = new TestQuestion();
        testQuestion2.setCorrectAnswer("Correct Answer");
        testQuestion2.setCreatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        testQuestion2.setExplanation("Explanation");
        testQuestion2.setId("42");
        testQuestion2.setQuestionText("Question Text");
        testQuestion2.setQuestionTranslation("Question Translation");
        testQuestion2.setQuestionType("Question Type");
        testQuestion2.setTest(test2);
        testQuestion2.setUpdatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        when(testQuestionRepository.save(Mockito.<TestQuestion>any())).thenReturn(testQuestion2);
        when(testQuestionRepository.findById(Mockito.<String>any())).thenReturn(ofResult);

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
        lesson3.setOrderIndex(1);
        lesson3.setStatus(true);
        lesson3.setTitle("Dr");
        lesson3.setUpdatedAt(LocalDate.of(1970, 1, 1).atStartOfDay());

        com.nihongo.sep490g2fa24.v1.model.Test test3 = new com.nihongo.sep490g2fa24.v1.model.Test();
        test3.setCreatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        test3.setDescription("The characteristics of someone or something");
        test3.setDuration(1);
        test3.setId("42");
        test3.setLesson(lesson3);
        test3.setPassScore(3);
        test3.setTitle("Dr");
        test3.setUpdatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));

        TestQuestion question = new TestQuestion();
        question.setCorrectAnswer("Correct Answer");
        question.setCreatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        question.setExplanation("Explanation");
        question.setId("42");
        question.setQuestionText("Question Text");
        question.setQuestionTranslation("Question Translation");
        question.setQuestionType("Question Type");
        question.setTest(test3);
        question.setUpdatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));

        // Act
        TestQuestion actualUpdateQuestionResult = testQuestionService.updateQuestion("42", question);

        // Assert
        verify(testQuestionRepository).findById(eq("42"));
        verify(testQuestionRepository).save(isA(TestQuestion.class));
        assertSame(testQuestion2, actualUpdateQuestionResult);
    }
}
