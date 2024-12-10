package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.v1.dtos.course.GrammarDTO;
import com.nihongo.sep490g2fa24.v1.model.Grammar;
import com.nihongo.sep490g2fa24.v1.model.UserGrammar;
import com.nihongo.sep490g2fa24.v1.services.impl.GrammarService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/grammars")
@RequiredArgsConstructor
public class GrammarController {
    private final GrammarService grammarService;

    @GetMapping
    public BaseApiResponse<List<GrammarDTO>> getAllGrammars() {
        return BaseApiResponse.succeed(grammarService.getAllGrammars());
    }

    @GetMapping("/{id}")
    public BaseApiResponse<GrammarDTO> getGrammarById(@PathVariable String id) {
        return BaseApiResponse.succeed(grammarService.getGrammarById(id));
    }

    @PostMapping
    public BaseApiResponse<Grammar> createGrammar(@RequestBody Grammar grammar) {
        return BaseApiResponse.succeed(grammarService.createGrammar(grammar));
    }

    @PutMapping("/{id}")
    public BaseApiResponse<Grammar> updateGrammar(@PathVariable String id, @RequestBody Grammar grammar) {
        return BaseApiResponse.succeed(grammarService.updateGrammar(id, grammar));
    }

    @DeleteMapping("/{id}")
    public BaseApiResponse<Void> deleteGrammar(@PathVariable String id) {
        grammarService.deleteGrammar(id);
        return BaseApiResponse.succeed() ;
    }

    @PostMapping("/user")
    public BaseApiResponse<UserGrammar> addUserGrammar(@RequestBody UserGrammar userGrammar, HttpServletRequest req) {
        return BaseApiResponse.succeed(grammarService.addUserGrammar(userGrammar,req.getRemoteUser()));
    }
}