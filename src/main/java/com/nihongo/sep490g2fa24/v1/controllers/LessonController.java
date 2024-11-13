package com.nihongo.sep490g2fa24.v1.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
@RestController
@RequestMapping("/api/v1/lessons")
@RequiredArgsConstructor
@Transactional
public class LessonController {
//    private final LessonService lessonService;
//    private final LessonMapper lessonMapper;
//
//    @GetMapping
//    public BaseApiResponse<List<LessonDetailDTO>> getAllLessons() {
//        List<Lesson> lessons = lessonService.getAllLessons();
//        List<LessonDetailDTO> lessonDTOs = lessons.stream()
//                .map(lessonMapper::toDetailDTO)
//                .collect(Collectors.toList());
//        return BaseApiResponse.succeed(lessonDTOs);
//    }
//
//    @GetMapping("/{id}")
//    public BaseApiResponse<LessonDetailDTO> getLessonById(@PathVariable String id) {
//        Lesson lesson = lessonService.getLessonById(id);
//        return BaseApiResponse.succeed(lessonMapper.toDetailDTO(lesson));
//    }
//
//    @GetMapping("/course/{courseId}")
//    public BaseApiResponse<List<LessonListDTO>> getLessonsByCourse(@PathVariable String courseId) {
//        List<Lesson> lessons = lessonService.getLessonsByCourseId(courseId);
//        List<LessonListDTO> lessonDTOs = lessons.stream()
//                .map(lessonMapper::toListDTO)
//                .collect(Collectors.toList());
//        return BaseApiResponse.succeed(lessonDTOs);
//    }
//
//    @PostMapping
//    public BaseApiResponse<Lesson> createLesson(@RequestBody Lesson lesson) {
//        return BaseApiResponse.succeed(lessonService.createLesson(lesson));
//    }
}
