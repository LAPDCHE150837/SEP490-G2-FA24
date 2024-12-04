package com.nihongo.sep490g2fa24.v1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

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
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
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

    @Column(name = "back_example_reading", columnDefinition = "TEXT")
    private String backExampleReading;

    @Column(name = "memorized")
    private boolean memorized = false;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "updated_at")
    private Date updatedAt;
}
