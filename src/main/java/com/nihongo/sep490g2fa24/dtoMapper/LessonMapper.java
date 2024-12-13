package com.nihongo.sep490g2fa24.dtoMapper;

import com.nihongo.sep490g2fa24.v1.dtos.course.*;
import com.nihongo.sep490g2fa24.v1.model.Grammar;
import com.nihongo.sep490g2fa24.v1.model.Kanji;
import com.nihongo.sep490g2fa24.v1.model.Lesson;
import com.nihongo.sep490g2fa24.v1.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class LessonMapper {

    public LessonListDTO toListDTO(Lesson lesson) {
        if (lesson == null) return null;

        return LessonListDTO.builder()
                .id(lesson.getId())
                .courseId(lesson.getCourse().getId())
                .title(lesson.getTitle())
                .description(lesson.getDescription())
                .orderIndex(lesson.getOrderIndex())
                .status(lesson.getStatus())
                .createdAt(lesson.getCreatedAt())
                .updatedAt(lesson.getUpdatedAt())
                .videoUr(lesson.getVideoUrl()) // Add this line

                .build();
    }

    public LessonDetailDTO toDetailDTO(Lesson lesson) {
        if (lesson == null) return null;

        return LessonDetailDTO.builder()
                .id(lesson.getId())
                .courseId(lesson.getCourse().getId())
                .title(lesson.getTitle())
                .description(lesson.getDescription())
                .orderIndex(lesson.getOrderIndex())
                .status(lesson.getStatus())
                .createdAt(lesson.getCreatedAt())
                .updatedAt(lesson.getUpdatedAt())
                .videoUrl(lesson.getVideoUrl())
                .vocabularies(lesson.getVocabularies().stream()
                        .map(this::toVocabularyDTO)
                        .collect(Collectors.toList()))
                .grammars(lesson.getGrammars().stream()
                        .map(this::toGrammarDTO)
                        .collect(Collectors.toList()))
                .kanjis(lesson.getKanjis().stream()
                        .map(this::toKanjiDTO)
                        .collect(Collectors.toList()))
                .build();
    }

    public VocabularyDTO toVocabularyDTO(Vocabulary vocabulary) {
        if (vocabulary == null) return null;

        return VocabularyDTO.builder()
                .id(vocabulary.getId())
                .imageUrl(vocabulary.getImageUrl())
                .word(vocabulary.getWord())
                .reading(vocabulary.getReading())
                .meaning(vocabulary.getMeaning())
                .example(vocabulary.getExample())
                .exampleReading(vocabulary.getExampleReading())
                .exampleMeaning(vocabulary.getExampleMeaning())
                .build();
    }

    public GrammarDTO toGrammarDTO(Grammar grammar) {
        if (grammar == null) return null;

        return GrammarDTO.builder()
                .id(grammar.getId())
                .imageUrl(grammar.getImageUrl())
                .pattern(grammar.getPattern())
                .meaning(grammar.getMeaning())
                .grammarUsage(grammar.getUsage())
                .example(grammar.getExample())
                .exampleReading(grammar.getExampleReading())
                .exampleMeaning(grammar.getExampleMeaning())
                .build();
    }

    public KanjiDTO toKanjiDTO(Kanji kanji) {
        if (kanji == null) return null;

        return KanjiDTO.builder()
                .id(kanji.getId())
                .imageUrl(kanji.getImageUrl())
                .character(kanji.getCharacter())
                .onyomi(kanji.getOnyomi())
                .kunyomi(kanji.getKunyomi())
                .meaning(kanji.getMeaning())
                .strokeCount(kanji.getStrokeCount())
                .radical(kanji.getRadical())
                .build();
    }
}