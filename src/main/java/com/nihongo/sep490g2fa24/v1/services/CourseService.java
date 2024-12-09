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
        if(course.getDescription().isEmpty()){
            throw new RuntimeException("description not null");
        }

        if(course.getLevel().isEmpty()){
            throw new RuntimeException("level not null");
        }

        if(course.getTotalLessons() == null){
            throw new RuntimeException("total lesson not null");
        }
        return courseRepository.save(course);
    }

    @Transactional
    public Course updateCourse(String id, Course courseDetails) {
        // Retrieve the course to be updated
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        // Validate the input fields (courseDetails)
        if (courseDetails.getTitle() == null || courseDetails.getTitle().isEmpty()) {
            throw new RuntimeException("Course title cannot be null or empty");
        }
        if (courseDetails.getDescription() == null || courseDetails.getDescription().isEmpty()) {
            throw new RuntimeException("Course description cannot be null or empty");
        }
        if (courseDetails.getLevel().isEmpty()) {
            throw new RuntimeException("Course level cannot be null");
        }
        if (courseDetails.getTotalLessons() == null) {
            throw new RuntimeException("Total lessons cannot be null");
        }
        if (courseDetails.getStatus() == null) {
            throw new RuntimeException("Course status cannot be null");
        }
        if (courseDetails.getCreatedAt() == null) {
            throw new RuntimeException("Created at date cannot be null");
        }
        if (courseDetails.getUpdatedAt() == null) {
            throw new RuntimeException("Updated at date cannot be null");
        }

        // Update the course details with the validated courseDetails
        course.setTitle(courseDetails.getTitle());
        course.setDescription(courseDetails.getDescription());
        course.setLevel(courseDetails.getLevel());
        course.setImageUrl(courseDetails.getImageUrl());
        course.setTotalLessons(courseDetails.getTotalLessons());
        course.setStatus(courseDetails.getStatus());
        course.setCreatedAt(courseDetails.getCreatedAt());
        course.setUpdatedAt(courseDetails.getUpdatedAt());

        // Save and return the updated course
        return courseRepository.save(course);
    }


    @Transactional
    public void deleteCourse(String id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        course.setStatus(false);
        courseRepository.delete(course);
    }
}

