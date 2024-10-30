package com.nihongo.sep490g2fa24.dtoMapper;

import com.nihongo.sep490g2fa24.v1.dtos.course.CourseDTO;
import com.nihongo.sep490g2fa24.v1.model.Course;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class CourseDTOMapper  implements Function<Course, CourseDTO> {

    @Override
    public CourseDTO apply(Course course) {
        return new CourseDTO(
                course.getId(),
                course.getCourseName(),
                course.getFlagActive(),
                course.getDescription()
        );
    }
}
