package com.nihongo.sep490g2fa24.v1.repositories;

import com.nihongo.sep490g2fa24.v1.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, String> {
    List<Lesson> findByCourseIdAndStatusOrderByCreatedAt(String courseId, Boolean status);


    List<Lesson> findByCourseIdAndStatusAndOrderIndexGreaterThan(
            String courseId, Boolean status, Integer orderIndex);

    List<Lesson> findByCourseIdAndStatusAndTitleContainingIgnoreCase(
            String courseId, Boolean status, String keyword);

    @Query("SELECT MAX(l.orderIndex) FROM Lesson l WHERE l.course.id = :courseId")
    Optional<Integer> findMaxOrderIndexByCourseId(@Param("courseId") String courseId);

    List<Lesson> findByCourseId(String courseId);

    List<Lesson> findByStatus(Boolean status);

    Optional<Lesson> findByIdAndStatus(String id, Boolean status);

    @Query("SELECT l FROM Lesson l WHERE l.course.status = true AND l.isDeleted = true AND l.course.user.id = :userId")
    List<Lesson> findLessonsByCourseStatusTrue(@Param("userId") String userId);

    @Query("SELECT l FROM Lesson l " +
            "JOIN UserVocabulary uv ON l.id = uv.vocabulary.lesson.id " +
            "WHERE uv.vocabulary.lesson.id = :lessonId AND uv.user.id = :userId AND uv.isLearning = true")
    List<Lesson> findLessonsWithLearnedVocabularyTrue(@Param("lessonId") String lessonId,@Param("userId") String userId);

    @Query("SELECT l FROM Lesson l " +
            "JOIN UserVocabulary uv ON l.id = uv.vocabulary.lesson.id " +
            "WHERE uv.vocabulary.lesson.id = :lessonId AND uv.user.id = :userId AND uv.isLearning = false")
    List<Lesson> findLessonsWithLearnedVocabularyFalse(@Param("lessonId") String lessonId,@Param("userId") String userId);
}
