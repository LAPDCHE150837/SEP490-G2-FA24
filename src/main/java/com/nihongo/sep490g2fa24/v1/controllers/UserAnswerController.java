package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.v1.dtos.course.UserAnswerDTO;
import com.nihongo.sep490g2fa24.v1.model.OverallStatistics;
import com.nihongo.sep490g2fa24.v1.model.QuestionStatistics;
import com.nihongo.sep490g2fa24.v1.model.TestQuestion;
import com.nihongo.sep490g2fa24.v1.model.UserAnswer;
import com.nihongo.sep490g2fa24.v1.repositories.UserAnswerRepository;
import com.nihongo.sep490g2fa24.v1.services.impl.UserAnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/user-answers")
@RequiredArgsConstructor
public class UserAnswerController {
    private final UserAnswerService userAnswerService;
    private final UserAnswerRepository userAnswerRepository;

    @GetMapping
    @Transactional(readOnly = true)
    public OverallStatistics calculateDetailedAnswerStatistics() {
        List<UserAnswer> allAnswers = userAnswerRepository.findAll();

        if (allAnswers.isEmpty()) {
            return new OverallStatistics(new ArrayList<>(), 0.0, 0, 0);
        }

        // Group answers by question
        Map<TestQuestion, List<UserAnswer>> answersByQuestion = allAnswers.stream()
                .collect(Collectors.groupingBy(UserAnswer::getQuestion));

        // Calculate statistics for each question
        List<QuestionStatistics> questionStats = answersByQuestion.entrySet().stream()
                .map(entry -> {
                    TestQuestion question = entry.getKey();
                    List<UserAnswer> questionAnswers = entry.getValue();

                    long totalAnswers = questionAnswers.size();
                    long incorrectAnswers = questionAnswers.stream()
                            .filter(answer -> !answer.getIsCorrect())
                            .count();
                    long correctAnswers = questionAnswers.stream()
                            .filter(UserAnswer::getIsCorrect)
                            .count();

                    double incorrectPercentage = (incorrectAnswers * 100.0) / totalAnswers;

                    return new QuestionStatistics(
                            question.getId(),
                            question.getQuestionText(), // Assuming this is the question name/text field
                            incorrectPercentage,
                            correctAnswers,
                            incorrectAnswers
                    );
                })
                .sorted(Comparator.comparing(QuestionStatistics::getIncorrectPercentage).reversed())
                .collect(Collectors.toList());

        // Calculate overall statistics
        long totalAnswers = allAnswers.size();
        long totalIncorrect = allAnswers.stream()
                .filter(answer -> !answer.getIsCorrect())
                .count();
        long totalCorrect = totalAnswers - totalIncorrect;
        double totalIncorrectPercentage = (totalIncorrect * 100.0) / totalAnswers;

        return new OverallStatistics(
                questionStats,
                totalIncorrectPercentage,
                totalCorrect,
                totalIncorrect
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserAnswerDTO> getUserAnswerById(@PathVariable String id) {
        return ResponseEntity.ok(userAnswerService.getUserAnswerById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<UserAnswer> createUserAnswer(@RequestBody UserAnswer userAnswer) {
        return ResponseEntity.ok(userAnswerService.createUserAnswer(userAnswer));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserAnswer> updateUserAnswer(
            @PathVariable String id,
            @RequestBody UserAnswer userAnswer
    ) {
        return ResponseEntity.ok(userAnswerService.updateUserAnswer(id, userAnswer));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserAnswer(@PathVariable String id) {
        userAnswerService.deleteUserAnswer(id);
        return ResponseEntity.ok().build();
    }
}
