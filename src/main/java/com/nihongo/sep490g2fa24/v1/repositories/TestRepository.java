package com.nihongo.sep490g2fa24.v1.repositories;

import com.nihongo.sep490g2fa24.v1.model.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestRepository extends JpaRepository<Test, String> {
    List<Test> findByLessonId(String lessonId);

    @Query("SELECT l FROM Test l WHERE l.lesson.isDeleted = true and l.lesson.course.status = true AND l.lesson.course.user.id = :userId")
    List<Test> findAllTest(@Param("userId") String userId);


    @Query("SELECT l FROM Test l WHERE l.lesson.isDeleted = true and l.lesson.course.status = true ")
    List<Test> findAllTestForUser();
}