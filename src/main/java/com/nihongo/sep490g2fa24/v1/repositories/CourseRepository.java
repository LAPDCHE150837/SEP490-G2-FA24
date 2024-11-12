package com.nihongo.sep490g2fa24.v1.repositories;


import com.nihongo.sep490g2fa24.v1.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, String> {
    List<Course> findAllByFlagActiveTrue();

}