package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.v1.dtos.course.KanjiDTO;
import com.nihongo.sep490g2fa24.v1.model.Kanji;
import com.nihongo.sep490g2fa24.v1.services.impl.KanjiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/kanjis")
@RequiredArgsConstructor
public class KanjiController {
    private final KanjiService kanjiService;

    @GetMapping
    public ResponseEntity<List<KanjiDTO>> getAllKanjis() {
        return ResponseEntity.ok(kanjiService.getAllKanjis());
    }

    @GetMapping("/{id}")
    public ResponseEntity<KanjiDTO> getKanjiById(@PathVariable String id) {
        return ResponseEntity.ok(kanjiService.getKanjiById(id));
    }

    @PostMapping
    public ResponseEntity<Kanji> createKanji(@RequestBody Kanji kanji) {
        return ResponseEntity.ok(kanjiService.createKanji(kanji));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Kanji> updateKanji(@PathVariable String id, @RequestBody Kanji kanji) {
        return ResponseEntity.ok(kanjiService.updateKanji(id, kanji));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteKanji(@PathVariable String id) {
        kanjiService.deleteKanji(id);
        return ResponseEntity.ok().build();
    }
}
