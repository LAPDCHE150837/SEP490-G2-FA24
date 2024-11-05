package com.nihongo.sep490g2fa24.v1.services;

import com.nihongo.sep490g2fa24.dtoMapper.CourseDTOMapper;
import com.nihongo.sep490g2fa24.v1.dtos.course.CourseDTO;
import com.nihongo.sep490g2fa24.v1.model.Course;
import com.nihongo.sep490g2fa24.v1.repositories.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository ;
    private final CourseDTOMapper courseDTOMapper ;

    public void addCourse(CourseDTO courseDTO) {
        Course course = new Course() ;
        course.setCourseName(courseDTO.getCourseName());
        course.setDescription(courseDTO.getDescription());
        course.setFlagActive(courseDTO.getFlagActive());
        course.setProcess("In progress");
        courseRepository.save(course) ;
    }

    public void updateCourseById(String courseId, CourseDTO courseDTO) {
        Course course =  courseRepository.findById(courseId).orElseThrow(()-> new RuntimeException("Course not found"));

        course.setCourseName(courseDTO.getCourseName());
        course.setDescription(courseDTO.getDescription());
        course.setProcess("In progress");
        courseRepository.save(course);
    }

    public void deleteCourseById(String courseId) {
        courseRepository.deleteById(courseId);
    }

    public List<CourseDTO> getAllCourse() {
        return courseRepository.findAll().stream().map(courseDTOMapper).toList()  ;
    }
}
