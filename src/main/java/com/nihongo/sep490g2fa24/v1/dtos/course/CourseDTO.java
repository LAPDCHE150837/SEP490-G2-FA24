package com.nihongo.sep490g2fa24.v1.dtos.course;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseDTO {
    private String id;
    private String courseName;
    private String flagActive;
    private String description;
    private String process;
    @NotNull
    private String courseCode;
}
