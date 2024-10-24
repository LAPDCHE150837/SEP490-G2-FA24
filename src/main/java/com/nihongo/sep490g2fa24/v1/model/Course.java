package com.nihongo.sep490g2fa24.v1.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
@Entity
@Table(name = "course", schema = "nihongo")
public class Course {
    @Id
    @Size(max = 36)
    @Column(name = "id", nullable = false, length = 36)
    private String id;

    @Size(max = 100)
    @NotNull
    @Column(name = "course_name", nullable = false, length = 100)
    private String courseName;

    @Size(max = 100)
    @ColumnDefault("'NOT ACTIVE'")
    @Column(name = "flag_active", length = 100)
    private String flagActive;

    @Size(max = 100)
    @Column(name = "description", length = 100)
    private String description;

    @Size(max = 100)
    @Column(name = "process", length = 100)
    private String process;

}
