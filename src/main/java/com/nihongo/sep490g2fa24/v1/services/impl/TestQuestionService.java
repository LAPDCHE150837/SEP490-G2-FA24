package com.nihongo.sep490g2fa24.v1.services.impl;

import com.nihongo.sep490g2fa24.dtoMapper.TestQuestionMapper;
import com.nihongo.sep490g2fa24.v1.dtos.course.TestQuestionDTO;
import com.nihongo.sep490g2fa24.v1.model.TestQuestion;
import com.nihongo.sep490g2fa24.v1.model.User;
import com.nihongo.sep490g2fa24.v1.repositories.TestQuestionRepository;
import com.nihongo.sep490g2fa24.v1.repositories.UserRepository;
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
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<TestQuestionDTO> getAllQuestions(String username) {
        User user = userRepository.findByUsername(username).orElseThrow() ;
        return questionRepository.findAllQuestion(user.getId()).stream()
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
        return questionRepository.save(question);
    }

    @Transactional
    public TestQuestion updateQuestion(String id, TestQuestion question) {
        TestQuestion existingQuestion = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));

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