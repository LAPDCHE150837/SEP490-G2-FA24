package com.nihongo.sep490g2fa24.v1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDateTime;
import java.util.List;
@Data
@Entity
@Table(name = "test_results")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TestResult {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false, length = 36)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_id", nullable = false)
    private Test test;

    @Column(name = "score", nullable = false)
    private Integer score;

    @Column(name = "time_taken", nullable = false)
    private Integer timeTaken;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "testResult", cascade = CascadeType.ALL)
    private List<UserAnswer> userAnswers;
}
