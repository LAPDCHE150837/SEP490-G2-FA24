package com.nihongo.sep490g2fa24.v1.controllers;


import com.nihongo.sep490g2fa24.dtoMapper.LessonMapper;
import com.nihongo.sep490g2fa24.v1.dtos.course.LessonDetailDTO;
import com.nihongo.sep490g2fa24.v1.model.Lesson;
import com.nihongo.sep490g2fa24.v1.model.User;
import com.nihongo.sep490g2fa24.v1.repositories.LessonRepository;
import com.nihongo.sep490g2fa24.v1.repositories.UserRepository;
import com.nihongo.sep490g2fa24.v1.repositories.UserVocabularyRepository;
import com.nihongo.sep490g2fa24.v1.services.impl.LessonService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;
@RestController
@RequestMapping("/api/v1/lessons")
@RequiredArgsConstructor
@Transactional
public class LessonController {

    private final LessonService lessonService;
    private final LessonMapper lessonMapper;
    private final UserRepository userRepository;
    private final UserVocabularyRepository userVocabularyRepository;
    private final LessonRepository lessonRepository;

    @GetMapping("/video/{lessonId}")
    public ResponseEntity<Resource> getVideo(@PathVariable String lessonId) throws IOException {
        Lesson lesson = lessonService.getLessonById(lessonId);

        Path videoPath = Paths.get(lesson.getVideoUrl());
        Resource resource = new FileSystemResource(videoPath);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("video/mp4"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @GetMapping
    public BaseApiResponse<List<LessonDetailDTO>> getAllLessons(HttpServletRequest req) {
        List<Lesson> lessons = lessonService.getAllLessons(req.getRemoteUser());
        List<LessonDetailDTO> lessonDTOs = lessons.stream()
                .map(lessonMapper::toDetailDTO)
                .collect(Collectors.toList());
        return BaseApiResponse.succeed(lessonDTOs);
    }

    @GetMapping("/{id}")
    public BaseApiResponse<LessonDetailDTO> getLessonById(@PathVariable String id) {
        Lesson lesson = lessonService.getLessonById(id);
        return BaseApiResponse.succeed(lessonMapper.toDetailDTO(lesson));
    }

    @GetMapping("/course/{courseId}")
    public BaseApiResponse<List<LessonDetailDTO>> getLessonsByCourse(@PathVariable String courseId) {
        List<Lesson> lessons = lessonService.getLessonsByCourseId(courseId);
        List<LessonDetailDTO> lessonDTOs = lessons.stream()
                .map(lessonMapper::toDetailDTO)
                .collect(Collectors.toList());
        return BaseApiResponse.succeed(lessonDTOs);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public BaseApiResponse<Lesson> createLesson(
            @RequestPart("lesson") Lesson lesson,
            @RequestPart(value = "video", required = false) MultipartFile video) {
        return BaseApiResponse.succeed(lessonService.createLesson(lesson, video));
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public BaseApiResponse<Lesson> updateLesson(
            @PathVariable String id,
            @RequestPart("lesson") Lesson lesson,
            @RequestPart(value = "video", required = false) MultipartFile video) {
        return BaseApiResponse.succeed(lessonService.updateLesson(id, lesson, video));
    }

    @DeleteMapping("/{id}")
    public BaseApiResponse<Void> deleteLesson(@PathVariable String id) {
        lessonService.deleteLesson(id);
        return BaseApiResponse.succeed();
    }


    @GetMapping("/course/{courseId}/contents/total")
    public Integer getTotalContentsByCourse(@PathVariable String courseId) {
        return lessonService.countTotalContentsByCourse(courseId);
    }


    @GetMapping("/course/{courseId}/user/total")
    public Long getTotalCourseByUser(@PathVariable String courseId,HttpServletRequest req) {
        User user = userRepository.findByUsername(req.getRemoteUser()).orElseThrow() ;
        return userVocabularyRepository.countLearningCourseForUser(user.getId(),courseId);
    }

    @PostMapping("/addItem/{id}")
    public BaseApiResponse<Lesson> createUserLesson(
            @PathVariable("id") String id,
            HttpServletRequest req)  {
        return BaseApiResponse.succeed(lessonService.createUserLesson(id, req.getRemoteUser()));
    }


    @GetMapping("/vocabularies/{lessonId}/filter")
    public BaseApiResponse<List<LessonDetailDTO>> getAllLessonWhichHasVocaAndIsLearningEqualTrue(@PathVariable String lessonId, HttpServletRequest req, @RequestParam String isLearning) {
        User user = userRepository.findByUsername(req.getRemoteUser()).orElseThrow(() ->
                new IllegalArgumentException("User not found with username: " + req.getRemoteUser())); ;
        List<Lesson> lessons = switch (isLearning) {
            case "learned" -> lessonRepository.findLessonsWithLearnedVocabularyTrue(lessonId, user.getId());
            case "unlearned" ->  lessonRepository.findLessonsWithLearnedVocabularyFalse(lessonId, user.getId());
            default -> lessonRepository.findAll();
        };
        List<LessonDetailDTO> lessonDTOs = lessons.stream()
                .map(lessonMapper::toDetailDTO)
                .collect(Collectors.toList());
        return BaseApiResponse.succeed(lessonDTOs);
    }
}
