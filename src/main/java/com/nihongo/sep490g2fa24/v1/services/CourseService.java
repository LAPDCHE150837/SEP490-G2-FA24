package com.nihongo.sep490g2fa24.v1.services;

import com.nihongo.sep490g2fa24.dtoMapper.CourseDTOMapper;
import com.nihongo.sep490g2fa24.exception.NhgClientException;
import com.nihongo.sep490g2fa24.exception.NhgErrorHandler;
import com.nihongo.sep490g2fa24.v1.dtos.course.CourseDTO;
import com.nihongo.sep490g2fa24.v1.model.Course;
import com.nihongo.sep490g2fa24.v1.repositories.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final CourseDTOMapper courseDTOMapper;

    public void addCourse(CourseDTO courseDTO) {
        boolean courseCodeExist = courseRepository.existsByCourseCode(courseDTO.getCourseCode());
        if (courseCodeExist) {
            throw new NhgClientException(NhgErrorHandler.COURSE_ALREADY_EXISTED);
        } else {
            Course course = new Course();
            BeanUtils.copyProperties(courseDTO, course);
            courseRepository.save(course);
        }

    }

    public void updateCourseById(String courseId, CourseDTO courseDTO) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(NhgClientException.supplier(NhgErrorHandler.COURSE_NOT_FOUND));
        if (courseRepository.existsByCourseCode(courseDTO.getCourseCode())) {
            throw new NhgClientException(NhgErrorHandler.COURSE_ALREADY_EXISTED);
        }
        BeanUtils.copyProperties(courseDTO, course);
        courseRepository.save(course);
    }

    public void deleteCourseById(String courseId) {
        courseRepository.deleteById(courseId);
    }

    public List<CourseDTO> getAllCourse() {
        return courseRepository.findAllByFlagActiveTrue().stream().map(courseDTOMapper).toList();
    }

    public List<CourseDTO> findAll() {
        return courseRepository.findAll().stream()
                .map(courseDTOMapper).toList();
    }

    public CourseDTO findById(String id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(NhgClientException.supplier(NhgErrorHandler.COURSE_NOT_FOUND));
        return courseDTOMapper.apply(course);
    }
}

