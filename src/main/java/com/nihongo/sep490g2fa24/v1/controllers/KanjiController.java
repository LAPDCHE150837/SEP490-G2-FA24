package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.v1.dtos.course.KanjiDTO;
import com.nihongo.sep490g2fa24.v1.model.Kanji;
import com.nihongo.sep490g2fa24.v1.services.impl.KanjiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/kanjis")
@RequiredArgsConstructor
public class KanjiController {
    private final KanjiService kanjiService;

    @GetMapping
    public BaseApiResponse<List<KanjiDTO>> getAllKanjis() {
        return BaseApiResponse.succeed(kanjiService.getAllKanjis());
    }

    @GetMapping("/{id}")
    public BaseApiResponse<KanjiDTO> getKanjiById(@PathVariable String id) {
        return BaseApiResponse.succeed(kanjiService.getKanjiById(id));
    }

    @PostMapping
    public BaseApiResponse<Kanji> createKanji(@RequestBody Kanji kanji) {
        return BaseApiResponse.succeed(kanjiService.createKanji(kanji));
    }

    @PutMapping("/{id}")
    public BaseApiResponse<Kanji> updateKanji(@PathVariable String id, @RequestBody Kanji kanji) {
        return BaseApiResponse.succeed(kanjiService.updateKanji(id, kanji));
    }

    @DeleteMapping("/{id}")
    public BaseApiResponse<Void> deleteKanji(@PathVariable String id) {
        kanjiService.deleteKanji(id);
        return BaseApiResponse.succeed();
    }
}