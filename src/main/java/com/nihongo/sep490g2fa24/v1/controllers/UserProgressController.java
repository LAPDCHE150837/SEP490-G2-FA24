package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.dtoMapper.LessonMapper;
import com.nihongo.sep490g2fa24.v1.dtos.course.LessonDetailDTO;
import com.nihongo.sep490g2fa24.v1.dtos.course.UserProgressDTO;
import com.nihongo.sep490g2fa24.v1.model.Lesson;
import com.nihongo.sep490g2fa24.v1.model.UserProgress;
import com.nihongo.sep490g2fa24.v1.repositories.UserProgressRepository;
import com.nihongo.sep490g2fa24.v1.services.impl.UserProgressService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/user-progress")
@RequiredArgsConstructor
public class UserProgressController {
    private final UserProgressService userProgressService;
    private final UserProgressRepository userProgressRepository;
    private final LessonMapper lessonMapper;

    @GetMapping
    public BaseApiResponse<List<LessonDetailDTO>> getAllLessons() {
        List<Lesson> lessons = userProgressRepository.findCompletedLessons();
        List<LessonDetailDTO> lessonDTOs = lessons.stream()
                .map(lessonMapper::toDetailDTO)
                .collect(Collectors.toList());
        return BaseApiResponse.succeed(lessonDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserProgressDTO> getUserProgressById(@PathVariable String id) {
        return ResponseEntity.ok(userProgressService.getUserProgressById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserProgressDTO>> getUserProgressByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(userProgressService.getUserProgressByUserId(userId));
    }

    @GetMapping("/lesson/{lessonId}")
    public ResponseEntity<UserProgressDTO> getUserProgressByUserAndLessonId(@PathVariable String lessonId,HttpServletRequest request) {
        return ResponseEntity.ok(userProgressService.getUserProgressByUserAndLessonId(lessonId,request.getRemoteUser()));
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public ResponseEntity<UserProgress> createUserProgress(
            @RequestBody UserProgress userProgress,
            String lessonId,
            HttpServletRequest request
    ) {
        return ResponseEntity.ok(userProgressService.createUserProgress(userProgress, request.getRemoteUser()));
    }

    @PutMapping("/lesson/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<UserProgress> updateUserProgress(
            @PathVariable String id,HttpServletRequest request
    ) {
        return ResponseEntity.ok(userProgressService.updateUserProgress(id, request.getRemoteUser()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserProgress(@PathVariable String id) {
        userProgressService.deleteUserProgress(id);
        return ResponseEntity.ok().build();
    }
}