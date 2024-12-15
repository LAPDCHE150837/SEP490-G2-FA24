package com.nihongo.sep490g2fa24.v1.repositories;


import com.nihongo.sep490g2fa24.v1.model.Course;
import com.nihongo.sep490g2fa24.v1.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CourseRepository extends JpaRepository<Course, String> {
    List<Course> findByStatus(Boolean status);
    List<Course> findByStatusAndUser(Boolean status, User user);
    List<Course> findByLevelOrderByCreatedAtDesc(String level);
    boolean existsByTitleAndStatus(String title, Boolean status);
}
