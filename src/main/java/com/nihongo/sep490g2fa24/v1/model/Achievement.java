//package com.nihongo.sep490g2fa24.v1.model;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//import java.time.Instant;
//import java.util.List;
//
//
//@Data
//@Entity
//@Table(name = "achievement")
//@NoArgsConstructor
//@AllArgsConstructor
//@Builder
//public class Achievement {
//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
//    @Column(name = "id", updatable = false, nullable = false, length = 36)
//    private String id;
//
//    @Column(name = "title", nullable = false, length = 100)
//    private String title;
//
//    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
//    private String description;
//
//    @Column(name = "icon_name", length = 50)
//    private String iconName;
//
//    @Column(name = "required_value", nullable = false)
//    private Integer requiredValue;
//
//    @Column(name = "achievement_type", nullable = false, length = 50)
//    private String achievementType;
//
//    @Column(name = "created_at")
//    private Instant createdAt;
//
//    @Column(name = "updated_at")
//    private Instant updatedAt;
//
//    @OneToMany(mappedBy = "achievement")
//    private List<UserAchievement> userAchievements;
//}
