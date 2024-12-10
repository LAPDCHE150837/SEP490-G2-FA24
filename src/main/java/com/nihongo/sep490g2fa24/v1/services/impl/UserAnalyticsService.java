package com.nihongo.sep490g2fa24.v1.services.impl;


import com.nihongo.sep490g2fa24.v1.dtos.course.TimeSeriesData;
import com.nihongo.sep490g2fa24.v1.dtos.course.UserAnalyticsDTO;
import com.nihongo.sep490g2fa24.v1.dtos.users.Role;
import com.nihongo.sep490g2fa24.v1.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserAnalyticsService {
    private final UserRepository userRepository;

    public UserAnalyticsDTO getUserAnalytics() {
        // Get users by role
        Map<String, Long> usersByRole = getUsersByRole();

        // Get users by status
        Map<String, Long> usersByStatus = getUsersByStatus();

        // Get registration trend for last 30 days
        TimeSeriesData registrationTrend = getRegistrationTrend(30);

        // Get total counts
        Long totalUsers = userRepository.count();
        Long activeUsers = userRepository.countByStatus("ACTIVE");
        Long inactiveUsers = userRepository.countByStatus("INACTIVE");

        return UserAnalyticsDTO.builder()
                .usersByRole(usersByRole)
                .usersByStatus(usersByStatus)
                .registrationTrend(registrationTrend)
                .totalUsers(totalUsers)
                .activeUsers(activeUsers)
                .inactiveUsers(inactiveUsers)
                .build();
    }

    private Map<String, Long> getUsersByRole() {
        return userRepository.countUsersByRole().stream()
                .collect(Collectors.toMap(
                        row -> ((Role) row[0]).name(),
                        row -> (Long) row[1]
                ));
    }

    private Map<String, Long> getUsersByStatus() {
        return userRepository.countUsersByStatus().stream()
                .collect(Collectors.toMap(
                        row -> (String) row[0],
                        row -> (Long) row[1]
                ));
    }

    private TimeSeriesData getRegistrationTrend(int days) {
        Instant startDate = Instant.now().minus(days, ChronoUnit.DAYS);
        List<Object[]> trendData = userRepository.getUserRegistrationTrend(startDate);

        List<String> labels = new ArrayList<>();
        List<Long> values = new ArrayList<>();

        // Create a map of date to count with proper conversion
        Map<LocalDate, Long> dateCountMap = trendData.stream()
                .collect(Collectors.toMap(
                        row -> ((java.sql.Date) row[0]).toLocalDate(), // Convert sql.Date to LocalDate
                        row -> (Long) row[1]
                ));

        // Fill in missing dates with zero
        LocalDate current = startDate.atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate end = LocalDate.now();

        while (!current.isAfter(end)) {
            labels.add(current.format(DateTimeFormatter.ISO_DATE));
            values.add(dateCountMap.getOrDefault(current, 0L));
            current = current.plusDays(1);
        }

        return TimeSeriesData.builder()
                .labels(labels)
                .values(values)
                .build();
    }
}