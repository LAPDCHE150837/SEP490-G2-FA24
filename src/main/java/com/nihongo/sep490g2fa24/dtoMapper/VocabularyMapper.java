package com.nihongo.sep490g2fa24.dtoMapper;

import com.nihongo.sep490g2fa24.v1.dtos.course.VocabularyDTO;
import com.nihongo.sep490g2fa24.v1.model.Lesson;
import com.nihongo.sep490g2fa24.v1.model.Vocabulary;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
@Component
@RequiredArgsConstructor
public class VocabularyMapper {

    public VocabularyDTO toDTO(Vocabulary vocabulary) {
        if (vocabulary == null) return null;

        return VocabularyDTO.builder()
                .id(vocabulary.getId())
                .word(vocabulary.getWord())
                .reading(vocabulary.getReading())
                .meaning(vocabulary.getMeaning())
                .example(vocabulary.getExample())
                .exampleReading(vocabulary.getExampleReading())
                .exampleMeaning(vocabulary.getExampleMeaning())
                .build();
    }

    public Vocabulary toEntity(VocabularyDTO dto, Lesson lesson) {
        if (dto == null) return null;

        Vocabulary vocabulary = new Vocabulary();
        vocabulary.setLesson(lesson);
        vocabulary.setWord(dto.getWord());
        vocabulary.setReading(dto.getReading());
        vocabulary.setMeaning(dto.getMeaning());
        vocabulary.setExample(dto.getExample());
        vocabulary.setExampleReading(dto.getExampleReading());
        vocabulary.setExampleMeaning(dto.getExampleMeaning());

        return vocabulary;
    }

    public void updateEntity(Vocabulary vocabulary, VocabularyDTO dto) {
        if (dto == null) return;

        vocabulary.setWord(dto.getWord());
        vocabulary.setReading(dto.getReading());
        vocabulary.setMeaning(dto.getMeaning());
        vocabulary.setExample(dto.getExample());
        vocabulary.setExampleReading(dto.getExampleReading());
        vocabulary.setExampleMeaning(dto.getExampleMeaning());
    }
}
