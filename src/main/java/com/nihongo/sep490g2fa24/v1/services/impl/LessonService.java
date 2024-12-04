package com.nihongo.sep490g2fa24.v1.services.impl;

import com.nihongo.sep490g2fa24.dtoMapper.LessonMapper;
import com.nihongo.sep490g2fa24.v1.dtos.course.LessonDetailDTO;
import com.nihongo.sep490g2fa24.v1.dtos.course.LessonListDTO;
import com.nihongo.sep490g2fa24.v1.model.Course;
import com.nihongo.sep490g2fa24.v1.model.Lesson;
import com.nihongo.sep490g2fa24.v1.repositories.CourseRepository;
import com.nihongo.sep490g2fa24.v1.repositories.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LessonService {
    @Value("${app.upload.dir}")
    private String uploadDir;
    private final LessonRepository lessonRepository;
    private final CourseRepository courseRepository;
    private final LessonMapper lessonMapper;

    @Transactional(readOnly = true)
    public List<Lesson> getAllLessons() {
        return lessonRepository.findByStatus(true);
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
    public Lesson createLesson(Lesson lesson, MultipartFile video) {
        Course course = courseRepository.findById(lesson.getCourse().getId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        if (video != null && !video.isEmpty()) {
            String videoUrl = saveVideo(video);
            lesson.setVideoUrl(videoUrl);
        }

        course.setTotalLessons(course.getTotalLessons() + 1);
        courseRepository.save(course);

        return lessonRepository.save(lesson);
    }

    @Transactional
    public Lesson updateLesson(String id, Lesson lesson, MultipartFile video) {
        Lesson existingLesson = getLessonById(id);

        if (video != null && !video.isEmpty()) {
            deleteExistingVideo(existingLesson.getVideoUrl());
            String videoUrl = saveVideo(video);
            existingLesson.setVideoUrl(videoUrl);
        }

        existingLesson.setCourse(lesson.getCourse());
        existingLesson.setTitle(lesson.getTitle());
        existingLesson.setDescription(lesson.getDescription());
        existingLesson.setStatus(lesson.getStatus());

        return lessonRepository.save(existingLesson);
    }

    private String saveVideo(MultipartFile video) {
        try {
            String fileName = UUID.randomUUID() + "_" + video.getOriginalFilename();
            Path uploadPath = Paths.get(uploadDir);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(fileName);
            Files.copy(video.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return "D:\\400tr\\FuLearning\\FALL2024\\DATN\\References\\image\\" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Could not store video file", e);
        }
    }

    private void deleteExistingVideo(String videoUrl) {
        if (videoUrl != null) {
            try {
                Path filePath = Paths.get(videoUrl.substring(videoUrl.lastIndexOf("/") + 1));
                Files.deleteIfExists(filePath);
            } catch (IOException e) {
                throw new RuntimeException("Could not delete video file", e);
            }
        }
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

    public List<Lesson> getLessonsByCourse(String courseId) {
        return null ;
    }
}
