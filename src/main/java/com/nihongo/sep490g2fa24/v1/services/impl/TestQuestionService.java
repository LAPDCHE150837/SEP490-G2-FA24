package com.nihongo.sep490g2fa24.v1.services.impl;

import com.nihongo.sep490g2fa24.dtoMapper.TestQuestionMapper;
import com.nihongo.sep490g2fa24.v1.dtos.course.TestQuestionDTO;
import com.nihongo.sep490g2fa24.v1.model.TestQuestion;
import com.nihongo.sep490g2fa24.v1.repositories.TestQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

// Services
@Service
@RequiredArgsConstructor
public class TestQuestionService {
    private final TestQuestionRepository questionRepository;
    private final TestQuestionMapper questionMapper;

    @Transactional(readOnly = true)
    public List<TestQuestionDTO> getAllQuestions() {
        return questionRepository.findAll().stream()
                .map(questionMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TestQuestionDTO getQuestionById(String id) {
        return questionRepository.findById(id)
                .map(questionMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Question not found"));
    }

    @Transactional
    public TestQuestion createQuestion(TestQuestion question) {
        if(question.getQuestionType() ==null || question.getQuestionType().isEmpty()){
            throw new RuntimeException("Question type is null");
        }

        if (question.getQuestionText() == null || question.getQuestionText().isEmpty()) {
            throw new RuntimeException("Question text is null");
        }
        if (question.getQuestionTranslation() == null || question.getQuestionTranslation().isEmpty()) {
            throw new RuntimeException("Question translation is null");
        }
        if (question.getCorrectAnswer() == null || question.getCorrectAnswer().isEmpty()) {
            throw new RuntimeException("Correct answer is null");
        }

        return questionRepository.save(question);
    }

    @Transactional
    public TestQuestion updateQuestion(String id, TestQuestion question) {
        TestQuestion existingQuestion = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        if(question.getQuestionType() ==null || question.getQuestionType().isEmpty()){
            throw new RuntimeException("Question type is null");
        }

        if (question.getQuestionText() == null || question.getQuestionText().isEmpty()) {
            throw new RuntimeException("Question text is null");
        }
        if (question.getQuestionTranslation() == null || question.getQuestionTranslation().isEmpty()) {
            throw new RuntimeException("Question translation is null");
        }
        if (question.getCorrectAnswer() == null || question.getCorrectAnswer().isEmpty()) {
            throw new RuntimeException("Correct answer is null");
        }

        existingQuestion.setQuestionType(question.getQuestionType());
        existingQuestion.setQuestionText(question.getQuestionText());
        existingQuestion.setQuestionTranslation(question.getQuestionTranslation());
        existingQuestion.setCorrectAnswer(question.getCorrectAnswer());
        existingQuestion.setExplanation(question.getExplanation());

        return questionRepository.save(existingQuestion);
    }

    @Transactional
    public void deleteQuestion(String id) {
        questionRepository.deleteById(id);
    }
}
