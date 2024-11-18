package com.nihongo.sep490g2fa24.v1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@Entity
@Table(name = "flashcards")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Flashcard {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false, length = 36)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "set_id", nullable = false)
    private FlashcardSet set;

    @Column(name = "front_text", nullable = false)
    private String frontText;

    @Column(name = "front_type", length = 50)
    private String frontType;

    @Column(name = "back_reading")
    private String backReading;

    @Column(name = "back_meaning", columnDefinition = "TEXT")
    private String backMeaning;

    @Column(name = "back_example", columnDefinition = "TEXT")
    private String backExample;

    @Column(name = "review_count")
    private Integer reviewCount = 0;

    @Column(name = "next_review")
    private LocalDate nextReview;

    @Column(name = "ease_factor")
    private Float easeFactor = 2.5f;

    @Column(name = "flashcard_interval")
    private Integer interval = 0;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "updated_at")
    private Date updatedAt;
}
