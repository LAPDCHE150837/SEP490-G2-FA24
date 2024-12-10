package com.nihongo.sep490g2fa24.v1.repositories;

import com.nihongo.sep490g2fa24.v1.model.TestQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestQuestionRepository extends JpaRepository<TestQuestion, String> {
    List<TestQuestion> findByTestId(String testId);

    @Query("SELECT l FROM TestQuestion l WHERE l.test.lesson.isDeleted = true AND l.test.lesson.course.status = true" )
    List<TestQuestion> findAllQuestion();
}