package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.v1.model.Course;
import com.nihongo.sep490g2fa24.v1.services.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/course")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;
    private final LessonService lessonService;

    @GetMapping
    public BaseApiResponse<List<CourseListDTO>> getAllCourses() {
        List<Course> courses = courseService.getAllCourses();
        List<CourseListDTO> courseDTOs = courses.stream()
                .map(CourseMapper::toListDTO)
                .collect(Collectors.toList());
        return BaseApiResponse.succeed(courseDTOs);
    }

    @GetMapping("/{id}")
    public BaseApiResponse<CourseListDTO> getCourseById(@PathVariable String id) {
        Course course = courseService.getCourseById(id);
        return BaseApiResponse.succeed(CourseMapper.toListDTO(course));
    }

    @GetMapping("/level/{level}")
    public BaseApiResponse<List<Course>> getCoursesByLevel(@PathVariable String level) {
        return BaseApiResponse.succeed(courseService.getCoursesByLevel(level));
    }



    @PostMapping
    public BaseApiResponse<Course> createCourse(@RequestBody Course course) {
        return BaseApiResponse.succeed(courseService.createCourse(course));
    }

    @PutMapping("/{id}")
    public BaseApiResponse<Course> updateCourse(@PathVariable String id, @RequestBody Course course) {
        return BaseApiResponse.succeed(courseService.updateCourse(id, course));
    }

    @DeleteMapping("/{id}")
    public BaseApiResponse<Void> deleteCourse(@PathVariable String id) {
        courseService.deleteCourse(id);
        return BaseApiResponse.succeed();
    }

    // Lesson endpoints within course context
    @GetMapping("/{courseId}/lessons")
    public BaseApiResponse<List<Lesson>> getLessonsByCourse(@PathVariable String courseId) {
        return BaseApiResponse.succeed(lessonService.getLessonsByCourse(courseId));
    }



    @PutMapping("/{courseId}/lessons/reorder")
    public ResponseEntity<Void> reorderLessons(
            @PathVariable String courseId,
            @RequestBody List<String> lessonIds) {
        lessonService.reorderLessons(courseId, lessonIds);
        return ResponseEntity.ok().build();
    }
}
