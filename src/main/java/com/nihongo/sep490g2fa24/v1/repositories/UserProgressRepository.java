package com.nihongo.sep490g2fa24.v1.repositories;

import com.nihongo.sep490g2fa24.v1.model.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserProgressRepository extends JpaRepository<UserProgress, String> {
    List<UserProgress> findByUserId(String userId);
    List<UserProgress> findByLessonId(String lessonId);
    Optional<UserProgress> findByUserUsernameAndLessonId(String username, String lessonId);
    Optional<UserProgress> findByUserIdAndLessonId(String userId, String lessonId);
}