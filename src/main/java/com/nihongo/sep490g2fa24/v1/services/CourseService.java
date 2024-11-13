package com.nihongo.sep490g2fa24.v1.services;

import com.nihongo.sep490g2fa24.v1.model.Course;
import com.nihongo.sep490g2fa24.v1.repositories.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;

    @Transactional(readOnly = true)
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(String id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
    }

    @Transactional(readOnly = true)
    public List<Course> getCoursesByLevel(String level) {
        return courseRepository.findByLevelOrderByCreatedAtDesc(level);
    }



    @Transactional
    public Course createCourse(Course course) {
        if (courseRepository.existsByTitleAndStatus(course.getTitle(), true)) {
            throw new RuntimeException("Course with this title already exists");
        }
        return courseRepository.save(course);
    }

    @Transactional
    public Course updateCourse(String id, Course courseDetails) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        course.setTitle(courseDetails.getTitle());
        course.setDescription(courseDetails.getDescription());
        course.setLevel(courseDetails.getLevel());
        course.setImageUrl(courseDetails.getImageUrl());

        return courseRepository.save(course);
    }

    @Transactional
    public void deleteCourse(String id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        course.setStatus(false);
        courseRepository.save(course);
    }
}

