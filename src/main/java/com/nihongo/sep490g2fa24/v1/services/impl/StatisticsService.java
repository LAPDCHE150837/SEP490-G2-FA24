package com.nihongo.sep490g2fa24.v1.services.impl;

import com.nihongo.sep490g2fa24.v1.repositories.UserAnswerRepository;
import com.nihongo.sep490g2fa24.v1.repositories.UserProgressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StatisticsService {
    private final UserProgressRepository userProgressRepository;
    private final UserAnswerRepository userAnswerRepository;

}
