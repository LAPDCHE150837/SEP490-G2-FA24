package com.nihongo.sep490g2fa24.v1.services.impl;

import com.nihongo.sep490g2fa24.dtoMapper.LessonMapper;
import com.nihongo.sep490g2fa24.v1.model.Course;
import com.nihongo.sep490g2fa24.v1.model.Lesson;
import com.nihongo.sep490g2fa24.v1.repositories.CourseRepository;
import com.nihongo.sep490g2fa24.v1.repositories.LessonRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

// Use MockitoExtension to enable mocking for this test class
@ExtendWith(MockitoExtension.class)
class LessonServiceTest2 {

    // Mock dependencies
    @Mock
    private LessonRepository lessonRepository;

    @Mock
    private CourseRepository courseRepository;

//    @Mock
//    private LessonMapper lessonMapper;

    // Inject mocks into the LessonService instance
    @InjectMocks
    private LessonService lessonService;

    private Lesson lesson;
    private Course course;
    private String lessonId;

    @BeforeEach
    void setUp() {
        // Initialize sample data for testing
        lessonId = UUID.randomUUID().toString();
        course = new Course();
        course.setId(UUID.randomUUID().toString());
        course.setTotalLessons(0);

        lesson = new Lesson();
        lesson.setId(lessonId);
        lesson.setCourse(course);
        lesson.setTitle("Sample Lesson");
        lesson.setDescription("Sample Description");
        lesson.setOrderIndex(1);
        lesson.setStatus(true);
    }

    @Test
    void testGetLessonById_Success() {
        // Arrange: Mock the repository to return a lesson when queried by ID
        when(lessonRepository.findByIdAndStatus(lessonId, true)).thenReturn(Optional.of(lesson));

        // Act: Call the service method
        Lesson result = lessonService.getLessonById(lessonId);

        // Assert: Verify the result matches the expected data
        assertNotNull(result);
        assertEquals(lessonId, result.getId());
        verify(lessonRepository, times(1)).findByIdAndStatus(lessonId, true);
    }

    @Test
    void testGetLessonById_NotFound() {
        // Arrange: Mock the repository to return empty (lesson not found)
        when(lessonRepository.findByIdAndStatus(lessonId, true)).thenReturn(Optional.empty());

        // Act & Assert: Expect an exception to be thrown
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            lessonService.getLessonById(lessonId);
        });

        assertEquals("Lesson not found with id: " + lessonId, exception.getMessage());
        verify(lessonRepository, times(1)).findByIdAndStatus(lessonId, true);
    }

//    @Test
//    void testCreateLesson_Success() {
//        // Arrange: Mock the course repository to return the course
//        when(courseRepository.findById(course.getId())).thenReturn(Optional.of(course));
//
//        // Mock file upload
//        MockMultipartFile videoFile = new MockMultipartFile("video", "video.mp4", "video/mp4", "fake-video-content".getBytes());
//        Lesson savedLesson = new Lesson();
//        savedLesson.setId(lessonId);
//
//        when(lessonRepository.save(any(Lesson.class))).thenReturn(savedLesson);
//
//        // Act: Call the createLesson method
//        Lesson result = lessonService.createLesson(lesson, videoFile);
//
//        // Assert: Verify the lesson was created and returned
//        assertNotNull(result);
//        assertEquals(lessonId, result.getId());
//        verify(courseRepository, times(1)).findById(course.getId());
//        verify(lessonRepository, times(1)).save(any(Lesson.class));
//    }

    @Test
    void testReorderLessons_Success() {
        // Arrange: Mock the lessons
        Lesson lesson1 = new Lesson();
        lesson1.setId(UUID.randomUUID().toString());
        lesson1.setCourse(course);
        Lesson lesson2 = new Lesson();
        lesson2.setId(UUID.randomUUID().toString());
        lesson2.setCourse(course);

        when(lessonRepository.findByIdAndStatus(lesson1.getId(), true)).thenReturn(Optional.of(lesson1));
        when(lessonRepository.findByIdAndStatus(lesson2.getId(), true)).thenReturn(Optional.of(lesson2));

        // List of lesson IDs in new order
        var reorderedIds = java.util.List.of(lesson1.getId(), lesson2.getId());

        // Act: Call the reorderLessons method
        assertDoesNotThrow(() -> lessonService.reorderLessons(course.getId(), reorderedIds));

        // Assert: Verify orderIndex was updated
        assertEquals(1, lesson1.getOrderIndex());
        assertEquals(2, lesson2.getOrderIndex());
        verify(lessonRepository, times(2)).save(any(Lesson.class));
    }

    @Test
    void testDeleteLesson_Success() {
        // Arrange: Mock the repository and course
        when(lessonRepository.getReferenceById(lessonId)).thenReturn(lesson);
        when(courseRepository.save(any(Course.class))).thenReturn(course);

        // Act: Call the deleteLesson method
        assertDoesNotThrow(() -> lessonService.deleteLesson(lessonId));

        // Assert: Verify the lesson is marked as deleted
        assertFalse(lesson.getIsDeleted());
        verify(courseRepository, times(1)).save(course);
        verify(lessonRepository, times(1)).save(lesson);
    }
}
