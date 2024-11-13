package com.nihongo.sep490g2fa24.v1.dtos.course;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KanjiDTO {
    private String id;
    private String character;
    private String onyomi;
    private String kunyomi;
    private String meaning;
    private Integer strokeCount;
    private String radical;
}
