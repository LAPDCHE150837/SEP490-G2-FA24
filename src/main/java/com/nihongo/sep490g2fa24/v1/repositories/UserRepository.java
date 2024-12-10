package com.nihongo.sep490g2fa24.v1.repositories;

import com.nihongo.sep490g2fa24.v1.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);

    @Query("SELECT u.role, COUNT(u) FROM User u GROUP BY u.role")
    List<Object[]> countUsersByRole();

    @Query("SELECT u.flagActive, COUNT(u) FROM User u GROUP BY u.flagActive")
    List<Object[]> countUsersByStatus();

    @Query("SELECT DATE(u.createdAt) as date, COUNT(u) FROM User u " +
            "WHERE u.createdAt >= :startDate " +
            "GROUP BY DATE(u.createdAt) " +
            "ORDER BY date")
    List<Object[]> getUserRegistrationTrend(Instant startDate);

    @Query("SELECT COUNT(u) FROM User u WHERE u.flagActive = :status")
    Long countByStatus(String status);
}
