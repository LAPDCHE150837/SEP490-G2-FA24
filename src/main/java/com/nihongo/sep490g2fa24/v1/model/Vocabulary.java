package com.nihongo.sep490g2fa24.v1.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "vocabulary", schema = "nihongo")
public class Vocabulary {
    @Id
    @Size(max = 36)
    @Column(name = "id", nullable = false, length = 36)
    private String id;

    @Size(max = 100)
    @Column(name = "meaning", length = 100)
    private String meaning;

    @Size(max = 100)
    @Column(name = "kanji", length = 100)
    private String kanji;

    @Size(max = 100)
    @Column(name = "example", length = 100)
    private String example;

    @Size(max = 100)
    @Column(name = "vietnamese_example", length = 100)
    private String vietnameseExample;

    @Size(max = 100)
    @Column(name = "phonology", length = 100)
    private String phonology;

}