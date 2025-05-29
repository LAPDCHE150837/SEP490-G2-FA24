//package com.nihongo.sep490g2fa24.v1.services.impl;
//
//import static org.junit.jupiter.api.Assertions.assertNull;
//import static org.mockito.Mockito.verify;
//import static org.mockito.Mockito.when;
//
//import com.nihongo.sep490g2fa24.dtoMapper.LessonMapper;
//import com.nihongo.sep490g2fa24.v1.model.Lesson;
//import com.nihongo.sep490g2fa24.v1.repositories.CourseRepository;
//import com.nihongo.sep490g2fa24.v1.repositories.LessonRepository;
//
//import java.util.List;
//
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.aot.DisabledInAotMode;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//
//@ContextConfiguration(classes = {LessonService.class})
//@ExtendWith(SpringExtension.class)
//@DisabledInAotMode
//class LessonServiceDiffblueTest {
//    @MockBean
//    private CourseRepository courseRepository;
//
//    @MockBean
//    private LessonMapper lessonMapper;
//
//    @MockBean
//    private LessonRepository lessonRepository;
//
//    @Autowired
//    private LessonService lessonService;
//
//    /**
//     * Test {@link LessonService#getAllLessons()}.
//     * <p>
//     * Method under test: {@link LessonService#getAllLessons()}
//     */
//    @Test
//    @DisplayName("Test getAllLessons()")
//    void testGetAllLessons() {
//        // Arrange
//        when(lessonRepository.findAll()).thenReturn(null);
//
//        // Act
//        List<Lesson> actualAllLessons = lessonService.getAllLessons();
//
//        // Assert
//        verify(lessonRepository).findAll();
//        assertNull(actualAllLessons);
//    }
//}
