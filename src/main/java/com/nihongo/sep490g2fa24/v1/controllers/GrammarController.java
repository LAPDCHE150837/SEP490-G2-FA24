package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.v1.dtos.course.GrammarDTO;
import com.nihongo.sep490g2fa24.v1.model.Grammar;
import com.nihongo.sep490g2fa24.v1.services.impl.GrammarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/grammars")
@RequiredArgsConstructor
public class GrammarController {
    private final GrammarService grammarService;

    @GetMapping
    public ResponseEntity<List<GrammarDTO>> getAllGrammars() {
        return ResponseEntity.ok(grammarService.getAllGrammars());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GrammarDTO> getGrammarById(@PathVariable String id) {
        return ResponseEntity.ok(grammarService.getGrammarById(id));
    }

    @PostMapping
    public ResponseEntity<Grammar> createGrammar(@RequestBody Grammar grammar) {
        return ResponseEntity.ok(grammarService.createGrammar(grammar));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Grammar> updateGrammar(@PathVariable String id, @RequestBody Grammar grammar) {
        return ResponseEntity.ok(grammarService.updateGrammar(id, grammar));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGrammar(@PathVariable String id) {
        grammarService.deleteGrammar(id);
        return ResponseEntity.ok().build();
    }
}
