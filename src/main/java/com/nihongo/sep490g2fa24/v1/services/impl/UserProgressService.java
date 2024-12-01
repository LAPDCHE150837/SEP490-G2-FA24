package com.nihongo.sep490g2fa24.v1.services.impl;

import com.nihongo.sep490g2fa24.dtoMapper.UserProgressMapper;
import com.nihongo.sep490g2fa24.v1.dtos.course.UserProgressDTO;
import com.nihongo.sep490g2fa24.v1.model.User;
import com.nihongo.sep490g2fa24.v1.model.UserProgress;
import com.nihongo.sep490g2fa24.v1.repositories.LessonRepository;
import com.nihongo.sep490g2fa24.v1.repositories.UserProgressRepository;
import com.nihongo.sep490g2fa24.v1.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserProgressService {
    private final UserProgressRepository userProgressRepository;
    private final UserRepository userRepository;
    private final LessonRepository lessonRepository;
    private final UserProgressMapper userProgressMapper;

    @Transactional(readOnly = true)
    public List<UserProgressDTO> getAllUserProgress() {
        return userProgressRepository.findAll().stream()
                .map(userProgressMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UserProgressDTO getUserProgressById(String id) {
        return userProgressRepository.findById(id)
                .map(userProgressMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("User Progress not found"));
    }

    @Transactional(readOnly = true)
    public List<UserProgressDTO> getUserProgressByUserId(String userId) {
        return userProgressRepository.findByUserId(userId).stream()
                .map(userProgressMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public UserProgress createUserProgress(UserProgress userProgress, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));


        // Create new progress
        userProgress.setUser(user);
        userProgress.setCompleted(true);
        userProgress.setUpdatedAt(LocalDateTime.now());
        userProgress.setLastStudiedAt(LocalDateTime.now());
        return userProgressRepository.save(userProgress);


    }

    @Transactional
    public UserProgress updateUserProgress(String lessonId,String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        UserProgress userProgress = userProgressRepository.findByUserIdAndLessonId(user.getId(),lessonId).orElseThrow(() -> new RuntimeException("User not found"));

        if(userProgress.getCompleted()) {
            userProgress.setCompleted(false);
        }else{
            userProgress.setCompleted(true);
        }
        userProgress.setLastStudiedAt(LocalDateTime.now());
        userProgress.setUpdatedAt(LocalDateTime.now());

        return userProgressRepository.save(userProgress);
    }

    @Transactional
    public void deleteUserProgress(String id) {
        userProgressRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public UserProgressDTO getUserProgressByUserAndLessonId(String lessonId,String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        return userProgressRepository.findByUserIdAndLessonId(user.getId(),lessonId)
                .map(userProgressMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("User Progress not found"));
    }


}
