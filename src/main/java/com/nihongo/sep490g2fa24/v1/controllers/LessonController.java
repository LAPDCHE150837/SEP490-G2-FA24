package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.dtoMapper.LessonMapper;
import com.nihongo.sep490g2fa24.v1.dtos.course.LessonDetailDTO;
import com.nihongo.sep490g2fa24.v1.model.Lesson;
import com.nihongo.sep490g2fa24.v1.services.impl.LessonService;
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
    public BaseApiResponse<List<LessonDetailDTO>> getAllLessons() {
        List<Lesson> lessons = lessonService.getAllLessons();
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
}
