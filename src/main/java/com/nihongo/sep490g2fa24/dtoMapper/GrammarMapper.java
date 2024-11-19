package com.nihongo.sep490g2fa24.dtoMapper;

import com.nihongo.sep490g2fa24.v1.dtos.course.GrammarDTO;
import com.nihongo.sep490g2fa24.v1.model.Grammar;
import com.nihongo.sep490g2fa24.v1.model.Lesson;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GrammarMapper {

    public GrammarDTO toDTO(Grammar grammar) {
        if (grammar == null) return null;

        return GrammarDTO.builder()
                .id(grammar.getId())
                .pattern(grammar.getPattern())
                .meaning(grammar.getMeaning())
                .grammarUsage(grammar.getUsage())
                .example(grammar.getExample())
                .exampleReading(grammar.getExampleReading())
                .exampleMeaning(grammar.getExampleMeaning())
                .build();
    }

    public Grammar toEntity(GrammarDTO dto, Lesson lesson) {
        if (dto == null) return null;

        Grammar grammar = new Grammar();
        grammar.setLesson(lesson);
        grammar.setPattern(dto.getPattern());
        grammar.setMeaning(dto.getMeaning());
        grammar.setUsage(dto.getGrammarUsage());
        grammar.setExample(dto.getExample());
        grammar.setExampleReading(dto.getExampleReading());
        grammar.setExampleMeaning(dto.getExampleMeaning());

        return grammar;
    }

    public void updateEntity(Grammar grammar, GrammarDTO dto) {
        if (dto == null) return;

        grammar.setPattern(dto.getPattern());
        grammar.setMeaning(dto.getMeaning());
        grammar.setUsage(dto.getGrammarUsage());
        grammar.setExample(dto.getExample());
        grammar.setExampleReading(dto.getExampleReading());
        grammar.setExampleMeaning(dto.getExampleMeaning());
    }
}
