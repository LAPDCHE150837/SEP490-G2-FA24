package com.nihongo.sep490g2fa24.dtoMapper;


import com.nihongo.sep490g2fa24.v1.dtos.course.KanjiDTO;
import com.nihongo.sep490g2fa24.v1.model.Kanji;
import com.nihongo.sep490g2fa24.v1.model.Lesson;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KanjiMapper {

    public KanjiDTO toDTO(Kanji kanji) {
        if (kanji == null) return null;

        return KanjiDTO.builder()
                .id(kanji.getId())
                .character(kanji.getCharacter())
                .onyomi(kanji.getOnyomi())
                .kunyomi(kanji.getKunyomi())
                .meaning(kanji.getMeaning())
                .strokeCount(kanji.getStrokeCount())
                .radical(kanji.getRadical())
                .build();
    }

    public Kanji toEntity(KanjiDTO dto, Lesson lesson) {
        if (dto == null) return null;

        Kanji kanji = new Kanji();
        kanji.setLesson(lesson);
        kanji.setCharacter(dto.getCharacter());
        kanji.setOnyomi(dto.getOnyomi());
        kanji.setKunyomi(dto.getKunyomi());
        kanji.setMeaning(dto.getMeaning());
        kanji.setStrokeCount(dto.getStrokeCount());
        kanji.setRadical(dto.getRadical());

        return kanji;
    }

    public void updateEntity(Kanji kanji, KanjiDTO dto) {
        if (dto == null) return;

        kanji.setCharacter(dto.getCharacter());
        kanji.setOnyomi(dto.getOnyomi());
        kanji.setKunyomi(dto.getKunyomi());
        kanji.setMeaning(dto.getMeaning());
        kanji.setStrokeCount(dto.getStrokeCount());
        kanji.setRadical(dto.getRadical());
    }
}
