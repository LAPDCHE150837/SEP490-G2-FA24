package com.nihongo.sep490g2fa24.v1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
@Data
@Entity
@Table(name = "kanji")
@AllArgsConstructor
@NoArgsConstructor
public class Kanji {
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

    @Column(name = "kanji_character", length = 10, nullable = false)
    private String character;

    @Column(name = "onyomi", length = 50)
    private String onyomi;

    @Column(name = "kunyomi", length = 50)
    private String kunyomi;

    @Column(name = "meaning", nullable = false)
    private String meaning;

    @Column(name = "stroke_count")
    private Integer strokeCount;

    @Column(name = "radical", length = 10)
    private String radical;

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
