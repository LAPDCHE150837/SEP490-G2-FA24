package com.nihongo.sep490g2fa24.v1.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "vocabulary")
@AllArgsConstructor
@NoArgsConstructor
public class Vocabulary {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String id;
    @Column(name = "image_url")
    private String imageUrl;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id", nullable = false)
    private Lesson lesson;

    @Column(name = "word", length = 50, nullable = false)
    @NotNull(message = "Word cannot be null")
    private String word;

    @Column(name = "reading", length = 50, nullable = false)
    private String reading;

    @Column(name = "meaning", nullable = false)
    private String meaning;

    @Column(name = "example", columnDefinition = "TEXT")
    private String example;

    @Column(name = "example_reading", columnDefinition = "TEXT")
    private String exampleReading;

    @Column(name = "example_meaning", columnDefinition = "TEXT")
    private String exampleMeaning;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}