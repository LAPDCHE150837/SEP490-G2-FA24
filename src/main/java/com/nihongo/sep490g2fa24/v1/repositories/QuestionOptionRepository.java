package com.nihongo.sep490g2fa24.v1.repositories;

import com.nihongo.sep490g2fa24.v1.model.QuestionOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionOptionRepository extends JpaRepository<QuestionOption, String> {
    List<QuestionOption> findByQuestionId(String questionId);
}
