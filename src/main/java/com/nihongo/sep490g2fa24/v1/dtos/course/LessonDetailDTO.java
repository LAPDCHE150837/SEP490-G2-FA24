package com.nihongo.sep490g2fa24.v1.dtos.course;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LessonDetailDTO {
    private String id;
    private String courseId;
    private String title;
    private String description;
    private Integer orderIndex;
    private Boolean status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<VocabularyDTO> vocabularies;
    private List<GrammarDTO> grammars;
    private List<KanjiDTO> kanjis;
    private String videoUrl ;
}
