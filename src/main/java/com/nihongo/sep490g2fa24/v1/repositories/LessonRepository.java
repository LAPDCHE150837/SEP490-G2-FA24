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
    List<Lesson> findByCourseIdAndStatusOrderByOrderIndex(String courseId, Boolean status);

    // Optional<Integer> findMaxOrderIndexByCourseId(String courseId);

    List<Lesson> findByCourseIdAndStatusAndOrderIndexGreaterThan(
            String courseId, Boolean status, Integer orderIndex);

    List<Lesson> findByCourseIdAndStatusAndTitleContainingIgnoreCase(
            String courseId, Boolean status, String keyword);

    @Query("SELECT MAX(l.orderIndex) FROM Lesson l WHERE l.course.id = :courseId")
    Optional<Integer> findMaxOrderIndexByCourseId(@Param("courseId") String courseId);

    List<Lesson> findByStatus(Boolean status);
}
