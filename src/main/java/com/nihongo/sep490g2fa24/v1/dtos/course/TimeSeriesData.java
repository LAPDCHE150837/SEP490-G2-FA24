package com.nihongo.sep490g2fa24.v1.dtos.course;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class TimeSeriesData {
    private List<String> labels;
    private List<Long> values;
}
