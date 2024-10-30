package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.v1.dtos.course.CourseDTO;
import com.nihongo.sep490g2fa24.v1.repositories.CourseRepository;
import com.nihongo.sep490g2fa24.v1.services.CourseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/course")
public class CourseController {

    private final CourseService courseService ;


    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }


    @GetMapping
    public List<CourseDTO> getAllCourse() {
        return courseService.getAllCourse();
    }


    @PostMapping
    public void addCourse(@RequestBody CourseDTO courseDTO) {
        courseService.addCourse(courseDTO);

    }

    @DeleteMapping("/{courseId}")
    public void deleteCourse(@PathVariable("courseId") String courseId) {
        courseService.deleteCourseById(courseId);
    }

    @PutMapping("/{courseId}")
    public void updateCourse(
            @PathVariable("courseId") String courseId,
            @RequestBody CourseDTO courseDTO) {
        courseService.updateCourseById(courseId, courseDTO);
    }


}
