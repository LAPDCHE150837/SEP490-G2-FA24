package com.nihongo.sep490g2fa24.v1.services.impl;

import com.nihongo.sep490g2fa24.dtoMapper.QuestionOptionMapper;
import com.nihongo.sep490g2fa24.v1.dtos.course.QuestionOptionDTO;
import com.nihongo.sep490g2fa24.v1.model.QuestionOption;
import com.nihongo.sep490g2fa24.v1.repositories.QuestionOptionRepository;
import com.nihongo.sep490g2fa24.v1.repositories.TestQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class QuestionOptionService {
    private final QuestionOptionRepository optionRepository;
    private final TestQuestionRepository questionRepository;
    private final QuestionOptionMapper optionMapper;

    @Transactional(readOnly = true)
    public List<QuestionOptionDTO> getAllOptions() {
        return optionRepository.findAll().stream()
                .map(optionMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public QuestionOptionDTO getOptionById(String id) {
        return optionRepository.findById(id)
                .map(optionMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Option not found"));
    }

    @Transactional
    public QuestionOption createOption(QuestionOption option) {
        return optionRepository.save(option);
    }

    @Transactional
    public QuestionOption updateOption(String id, QuestionOption option) {
        QuestionOption existingOption = optionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Option not found"));

        existingOption.setOptionText(option.getOptionText());
        existingOption.setIsCorrect(option.getIsCorrect());

        return optionRepository.save(existingOption);
    }

    @Transactional
    public void deleteOption(String id) {
        optionRepository.deleteById(id);
    }
}
