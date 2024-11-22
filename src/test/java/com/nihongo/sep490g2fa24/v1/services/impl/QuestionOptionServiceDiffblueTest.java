package com.nihongo.sep490g2fa24.v1.services.impl;

import static org.junit.jupiter.api.Assertions.assertSame;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.isA;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.nihongo.sep490g2fa24.dtoMapper.QuestionOptionMapper;
import com.nihongo.sep490g2fa24.v1.model.Course;
import com.nihongo.sep490g2fa24.v1.model.Lesson;
import com.nihongo.sep490g2fa24.v1.model.QuestionOption;
import com.nihongo.sep490g2fa24.v1.model.TestQuestion;
import com.nihongo.sep490g2fa24.v1.repositories.QuestionOptionRepository;
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

@ContextConfiguration(classes = {QuestionOptionService.class})
@ExtendWith(SpringExtension.class)
@DisabledInAotMode
class QuestionOptionServiceDiffblueTest {
    @MockBean
    private QuestionOptionMapper questionOptionMapper;

    @MockBean
    private QuestionOptionRepository questionOptionRepository;

    @Autowired
    private QuestionOptionService questionOptionService;

    @MockBean
    private TestQuestionRepository testQuestionRepository;

    /**
     * Test {@link QuestionOptionService#updateOption(String, QuestionOption)}.
     * <p>
     * Method under test:
     * {@link QuestionOptionService#updateOption(String, QuestionOption)}
     */
    @org.junit.jupiter.api.Test
    @DisplayName("Test updateOption(String, QuestionOption)")
    void testUpdateOption() {
        // Arrange
        Lesson lesson = new Lesson();
        lesson.setCourse(new Course());
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

        TestQuestion question = new TestQuestion();
        question.setCorrectAnswer("Correct Answer");
        question.setCreatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        question.setExplanation("Explanation");
        question.setId("42");
        question.setQuestionText("Question Text");
        question.setQuestionTranslation("Question Translation");
        question.setQuestionType("Question Type");
        question.setTest(test);
        question.setUpdatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));

        QuestionOption questionOption = new QuestionOption();
        questionOption.setCreatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        questionOption.setId("42");
        questionOption.setIsCorrect(true);
        questionOption.setOptionText("Option Text");
        questionOption.setQuestion(question);
        questionOption.setUpdatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        Optional<QuestionOption> ofResult = Optional.of(questionOption);

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

        Lesson lesson2 = new Lesson();
        lesson2.setCourse(course);
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

        TestQuestion question2 = new TestQuestion();
        question2.setCorrectAnswer("Correct Answer");
        question2.setCreatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        question2.setExplanation("Explanation");
        question2.setId("42");
        question2.setQuestionText("Question Text");
        question2.setQuestionTranslation("Question Translation");
        question2.setQuestionType("Question Type");
        question2.setTest(test2);
        question2.setUpdatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));

        QuestionOption questionOption2 = new QuestionOption();
        questionOption2.setCreatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        questionOption2.setId("42");
        questionOption2.setIsCorrect(true);
        questionOption2.setOptionText("Option Text");
        questionOption2.setQuestion(question2);
        questionOption2.setUpdatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        when(questionOptionRepository.save(Mockito.<QuestionOption>any())).thenReturn(questionOption2);
        when(questionOptionRepository.findById(Mockito.<String>any())).thenReturn(ofResult);

        Lesson lesson3 = new Lesson();
        lesson3.setCourse(new Course());
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

        TestQuestion question3 = new TestQuestion();
        question3.setCorrectAnswer("Correct Answer");
        question3.setCreatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        question3.setExplanation("Explanation");
        question3.setId("42");
        question3.setQuestionText("Question Text");
        question3.setQuestionTranslation("Question Translation");
        question3.setQuestionType("Question Type");
        question3.setTest(test3);
        question3.setUpdatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));

        QuestionOption option = new QuestionOption();
        option.setCreatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        option.setId("42");
        option.setIsCorrect(true);
        option.setOptionText("Option Text");
        option.setQuestion(question3);
        option.setUpdatedAt(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));

        // Act
        QuestionOption actualUpdateOptionResult = questionOptionService.updateOption("42", option);

        // Assert
        verify(questionOptionRepository).findById(eq("42"));
        verify(questionOptionRepository).save(isA(QuestionOption.class));
        assertSame(questionOption2, actualUpdateOptionResult);
    }
}
