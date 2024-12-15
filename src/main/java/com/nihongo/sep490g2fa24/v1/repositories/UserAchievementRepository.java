package com.nihongo.sep490g2fa24.v1.repositories;

import com.nihongo.sep490g2fa24.v1.model.UserAchievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAchievementRepository extends JpaRepository<UserAchievement, String> {
    @Query("SELECT  ua FROM UserAchievement ua WHERE ua.user.id = :userId AND ua.course.id = :courseId")
    List<UserAchievement> findDistinctByUserIdAndCourseId(@Param("userId") String userId, @Param("courseId") String courseId);

    @Query("SELECT  ua FROM UserAchievement ua WHERE ua.user.id = :userId")
    List<UserAchievement> findDistinctByUserId(@Param("userId") String userId);
}
