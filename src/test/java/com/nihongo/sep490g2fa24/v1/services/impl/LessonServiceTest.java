package com.nihongo.sep490g2fa24.v1.services.impl;

import com.nihongo.sep490g2fa24.dtoMapper.LessonMapper;
import com.nihongo.sep490g2fa24.v1.dtos.course.LessonDetailDTO;
import com.nihongo.sep490g2fa24.v1.model.Course;
import com.nihongo.sep490g2fa24.v1.model.Lesson;
import com.nihongo.sep490g2fa24.v1.repositories.CourseRepository;
import com.nihongo.sep490g2fa24.v1.repositories.LessonRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class LessonServiceTest {

    @Mock
    private LessonRepository lessonRepository;

    @Mock
    private CourseRepository courseRepository;

    @Mock
    private LessonMapper lessonMapper;

    @InjectMocks
    private LessonService lessonService;

    private Lesson lesson;
    private Course course;

    @BeforeEach
    void setUp() {
        // Mock data
        course = new Course();
        course.setId("course-1");
        course.setTotalLessons(0);

        lesson = new Lesson();
        lesson.setId("lesson-1");
        lesson.setTitle("Sample Lesson");
        lesson.setDescription("Lesson description");
        lesson.setCourse(course);
    }

    @Test
    void testGetLessonById_Success() {
        // Arrange
        when(lessonRepository.findById("lesson-1")).thenReturn(Optional.of(lesson));

        // Act
        Lesson foundLesson = lessonService.getLessonById("lesson-1");

        // Assert
        assertNotNull(foundLesson);
        assertEquals("lesson-1", foundLesson.getId());
        verify(lessonRepository, times(1)).findById("lesson-1");
    }

    @Test
    void testCreateLesson_Success() {
        // Arrange
        when(courseRepository.findById("course-1")).thenReturn(Optional.of(course));
        when(lessonRepository.save(any(Lesson.class))).thenReturn(lesson);

        // Act
        Lesson createdLesson = lessonService.createLesson(lesson, null);

        // Assert
        assertNotNull(createdLesson);
        assertEquals("lesson-1", createdLesson.getId());
        verify(courseRepository, times(1)).findById("course-1");
        verify(lessonRepository, times(1)).save(any(Lesson.class));
    }

    @Test
    void testUpdateLesson_Success() {
        // Arrange
        Lesson updatedLesson = new Lesson();
        updatedLesson.setTitle("Updated Title");
        updatedLesson.setDescription("Updated Description");

        when(lessonRepository.findById("lesson-1")).thenReturn(Optional.of(lesson));
        when(lessonRepository.save(any(Lesson.class))).thenReturn(lesson);

        // Act
        Lesson result = lessonService.updateLesson("lesson-1", updatedLesson, null);

        // Assert
        assertEquals("Updated Title", result.getTitle());
        assertEquals("Updated Description", result.getDescription());
        verify(lessonRepository, times(1)).save(any(Lesson.class));
    }

    @Test
    void testDeleteLesson_Success() {
        // Arrange
        when(lessonRepository.findById("lesson-1")).thenReturn(Optional.of(lesson));
        when(courseRepository.save(any(Course.class))).thenReturn(course);

        // Act
        lessonService.deleteLesson("lesson-1");

        // Assert
        verify(lessonRepository, times(1)).delete(lesson);
        verify(courseRepository, times(1)).save(any(Course.class));
    }

    @Test
    void testGetLessonsByCourseId_Success() {
        // Arrange
        List<Lesson> lessons = new ArrayList<>();
        lessons.add(lesson);

        when(lessonRepository.findByCourseIdAndStatusOrderByOrderIndex("course-1", true))
                .thenReturn(lessons);

        // Act
        List<Lesson> foundLessons = lessonService.getLessonsByCourseId("course-1");

        // Assert
        assertEquals(1, foundLessons.size());
        verify(lessonRepository, times(1)).findByCourseIdAndStatusOrderByOrderIndex("course-1", true);
    }

    @Test
    void testReorderLessons_Success() {
        // Arrange
        List<String> lessonIds = List.of("lesson-1");
        when(lessonRepository.findById("lesson-1")).thenReturn(Optional.of(lesson));

        // Act
        lessonService.reorderLessons("course-1", lessonIds);

        // Assert
        assertEquals(1, lesson.getOrderIndex());
        verify(lessonRepository, times(1)).save(any(Lesson.class));
    }
}
