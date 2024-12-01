package com.nihongo.sep490g2fa24.v1.services.impl;

import com.nihongo.sep490g2fa24.dtoMapper.UserAnswerMapper;
import com.nihongo.sep490g2fa24.v1.dtos.course.UserAnswerDTO;
import com.nihongo.sep490g2fa24.v1.model.UserAnswer;
import com.nihongo.sep490g2fa24.v1.repositories.UserAnswerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserAnswerService {
    private final UserAnswerRepository userAnswerRepository;
    private final UserAnswerMapper userAnswerMapper;

    @Transactional(readOnly = true)
    public List<UserAnswerDTO> getAllUserAnswers() {
        return userAnswerRepository.findAll().stream()
                .map(userAnswerMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UserAnswerDTO getUserAnswerById(String id) {
        return userAnswerRepository.findById(id)
                .map(userAnswerMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("User Answer not found"));
    }

    @Transactional
    public UserAnswer createUserAnswer(UserAnswer userAnswer) {
        return userAnswerRepository.save(userAnswer);
    }

    @Transactional
    public UserAnswer updateUserAnswer(String id, UserAnswer userAnswer) {
        UserAnswer existingAnswer = userAnswerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User Answer not found"));

        existingAnswer.setIsCorrect(userAnswer.getIsCorrect());
        existingAnswer.setSelectedOption(userAnswer.getSelectedOption());

        return userAnswerRepository.save(existingAnswer);
    }

    @Transactional
    public void deleteUserAnswer(String id) {
        userAnswerRepository.deleteById(id);
    }
}
