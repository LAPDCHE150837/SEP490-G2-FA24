package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.v1.dtos.course.CourseDTO;
import com.nihongo.sep490g2fa24.v1.services.CourseService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "api/v1/admin", produces = APPLICATION_JSON_VALUE)
@Transactional
public class AdminController {
    private final CourseService courseService;

    @GetMapping
    public BaseApiResponse<List<CourseDTO>> getAllCourse() {
        return BaseApiResponse.succeed(courseService.findAll());
    }


    @PostMapping
    public BaseApiResponse<Void> addCourse(@RequestBody CourseDTO courseDTO) {
        courseService.addCourse(courseDTO);
        return BaseApiResponse.succeed();
    }

    @DeleteMapping("/{courseId}")
    public BaseApiResponse<Void> deleteCourse(@PathVariable("courseId") String courseId) {
        courseService.deleteCourseById(courseId);
        return BaseApiResponse.succeed();
    }
    @PutMapping("/{courseId}")
    public BaseApiResponse<Void> updateCourse(
            @PathVariable("courseId") String courseId,
            @RequestBody CourseDTO courseDTO) {
        courseService.updateCourseById(courseId, courseDTO);
        return BaseApiResponse.succeed();
    }
}
