package com.nihongo.sep490g2fa24.v1.dtos.course;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class UserAnalyticsDTO {
    private Map<String, Long> usersByRole;
    private Map<String, Long> usersByStatus;
    private TimeSeriesData registrationTrend;
    private Long totalUsers;
    private Long activeUsers;
    private Long inactiveUsers;
}

