package com.nihongo.sep490g2fa24.v1.services.impl;

import com.nihongo.sep490g2fa24.dtoMapper.LessonMapper;
import com.nihongo.sep490g2fa24.v1.dtos.course.LessonDetailDTO;
import com.nihongo.sep490g2fa24.v1.dtos.course.LessonListDTO;
import com.nihongo.sep490g2fa24.v1.model.Course;
import com.nihongo.sep490g2fa24.v1.model.Lesson;
import com.nihongo.sep490g2fa24.v1.repositories.CourseRepository;
import com.nihongo.sep490g2fa24.v1.repositories.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LessonService {

    private final LessonRepository lessonRepository;
    private final CourseRepository courseRepository;
    private final LessonMapper lessonMapper;

    @Transactional(readOnly = true)
    public List<Lesson> getAllLessons() {
        return lessonRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Lesson getLessonById(String id) {
        return lessonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lesson not found with id: " + id));
    }

    @Transactional(readOnly = true)
    public List<Lesson> getLessonsByCourseId(String courseId) {
        return lessonRepository.findByCourseIdAndStatusOrderByOrderIndex(courseId, true);
    }

    @Transactional
    public Lesson createLesson(Lesson lesson) {
        Course course = courseRepository.findById(lesson.getCourse().getId())
                .orElseThrow(() -> new RuntimeException("Course not found "));

        // Update course total lessons
        course.setTotalLessons(0);
        courseRepository.save(course);

        return lessonRepository.save(lesson);
    }

    @Transactional
    public Lesson updateLesson(String id, Lesson Lesson) {
        Lesson existingLesson = getLessonById(id);

        existingLesson.setCourse(Lesson.getCourse());
        existingLesson.setTitle(Lesson.getTitle());
        existingLesson.setDescription(Lesson.getDescription());
        existingLesson.setStatus(Lesson.getStatus());
        existingLesson.setOrderIndex(Lesson.getOrderIndex());

        return lessonRepository.save(existingLesson);
    }

    @Transactional
    public void deleteLesson(String id) {
        Lesson lesson = getLessonById(id);
        Course course = lesson.getCourse();



        // Update course total lessons
        course.setTotalLessons(course.getTotalLessons() - 1);
        courseRepository.save(course);

        // Reorder remaining lessons
        List<Lesson> remainingLessons = lessonRepository.findByCourseIdAndStatusAndOrderIndexGreaterThan(
                course.getId(), true, lesson.getOrderIndex());

        remainingLessons.forEach(remainingLesson -> {
            remainingLesson.setOrderIndex(remainingLesson.getOrderIndex() - 1);
            lessonRepository.save(remainingLesson);
        });
        lessonRepository.delete(lesson);
    }

    @Transactional
    public void reorderLessons(String courseId, List<String> lessonIds) {
        for (int i = 0; i < lessonIds.size(); i++) {
            Lesson lesson = getLessonById(lessonIds.get(i));
            if (!lesson.getCourse().getId().equals(courseId)) {
                throw new IllegalArgumentException("Lesson does not belong to specified course");
            }
            lesson.setOrderIndex(i + 1);
            lessonRepository.save(lesson);
        }
    }

    @Transactional(readOnly = true)
    public LessonDetailDTO getLessonWithContents(String id) {
        Lesson lesson = getLessonById(id);
        return lessonMapper.toDetailDTO(lesson);
    }

    @Transactional(readOnly = true)
    public List<LessonListDTO> searchLessons(String courseId, String keyword) {
        List<Lesson> lessons;
        if (StringUtils.hasText(keyword)) {
            lessons = lessonRepository.findByCourseIdAndStatusAndTitleContainingIgnoreCase(
                    courseId, true, keyword);
        } else {
            lessons = getLessonsByCourseId(courseId);
        }
        return lessons.stream()
                .map(lessonMapper::toListDTO)
                .collect(Collectors.toList());
    }

    public List<Lesson> getLessonsByCourse(String courseId) {
        return null ;
    }
}
