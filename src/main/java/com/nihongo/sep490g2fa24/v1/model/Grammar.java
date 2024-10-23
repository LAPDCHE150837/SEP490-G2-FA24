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
@Table(name = "grammar", schema = "nihongo")
public class Grammar {
    @Id
    @Size(max = 100)
    @Column(name = "id", nullable = false, length = 100)
    private String id;

    @Size(max = 100)
    @Column(name = "structure", length = 100)
    private String structure;

    @Size(max = 100)
    @Column(name = "signification", length = 100)
    private String signification;

    @Size(max = 100)
    @Column(name = "example", length = 100)
    private String example;

    @Size(max = 100)
    @Column(name = "vietnamese_example", length = 100)
    private String vietnameseExample;

}
