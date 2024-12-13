package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.v1.dtos.course.VocabularyDTO;
import com.nihongo.sep490g2fa24.v1.model.*;
import com.nihongo.sep490g2fa24.v1.repositories.*;
import com.nihongo.sep490g2fa24.v1.services.impl.VocabularyService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/vocabularies")
@RequiredArgsConstructor
public class VocabularyController {
    private final VocabularyService vocabularyService;
    private final UserVocabularyRepository userVocabularyRepository;
    private final VocabularyRepository vocabularyRepository;
    private final UserRepository userRepository;
    private final GrammarRepository grammarRepository;
    private final KanjiRepository kanjiRepository;
    private final LessonRepository lessonRepository;

    @GetMapping
    public BaseApiResponse<List<VocabularyDTO>> getAllVocabularies() {
        return BaseApiResponse.succeed(vocabularyService.getAllVocabularies());
    }

    @GetMapping("/{id}")
    public BaseApiResponse<VocabularyDTO> getVocabularyById(@PathVariable String id) {
        return BaseApiResponse.succeed(vocabularyService.getVocabularyById(id));
    }

    @PostMapping
    public BaseApiResponse<Vocabulary> createVocabulary(@RequestBody Vocabulary vocabulary) {
        return BaseApiResponse.succeed(vocabularyService.createVocabulary(vocabulary));
    }

    @PutMapping("/{id}")
    public BaseApiResponse<Vocabulary> updateVocabulary(@PathVariable String id, @RequestBody Vocabulary vocabulary) {
        return BaseApiResponse.succeed(vocabularyService.updateVocabulary(id, vocabulary));
    }

    @DeleteMapping("/{id}")
    public BaseApiResponse<Void> deleteVocabulary(@PathVariable String id) {
        vocabularyService.deleteVocabulary(id);
        return BaseApiResponse.succeed();
    }

    @PostMapping("/user")
    public BaseApiResponse<UserVocabulary> addUserVocabulary(@RequestBody UserVocabulary userVocabulary, HttpServletRequest req) {
        return BaseApiResponse.succeed(vocabularyService.addUserVocabulary(userVocabulary,req.getRemoteUser()));
    }


    @GetMapping("/user/{id}")
    public Optional<Boolean> getUserVocabulary(@PathVariable String id, HttpServletRequest req) {
        Vocabulary vocabulary = vocabularyRepository.findById(id).orElse(null);
        User user = userRepository.findByUsername(req.getRemoteUser()).orElseThrow() ;
        return userVocabularyRepository.findByUserAndVocabulary2(user,vocabulary);
    }


    @GetMapping("/user/grammar/{id}")
    public Optional<Boolean> getUserGrammar(@PathVariable String id, HttpServletRequest req) {
        Grammar grammar = grammarRepository.findById(id).orElse(null);
        User user = userRepository.findByUsername(req.getRemoteUser()).orElseThrow() ;
        return userVocabularyRepository.findByUserAndGrammar(user,grammar);
    }

    @GetMapping("/user/kanji/{id}")
    public Optional<Boolean> getUserKanji(@PathVariable String id, HttpServletRequest req) {
        Kanji kanji = kanjiRepository.findById(id).orElse(null);
        User user = userRepository.findByUsername(req.getRemoteUser()).orElseThrow() ;
        return userVocabularyRepository.findByUserAndKanji(user,kanji);
    }

    @GetMapping("/user/learning-count/{id}")
    public Long getLearningCountForUser(@PathVariable String id,HttpServletRequest req) {
        User user = userRepository.findByUsername(req.getRemoteUser()).orElseThrow() ;
        return userVocabularyRepository.countLearningForUser(user.getId(),id);
    }


    @GetMapping("/user/total_lesson/{id}")
    public int getTotalLessonContent(@PathVariable String id) {
        Lesson lesson = lessonRepository.findById(id).orElse(null);
        assert lesson != null;
        int vocabCount = lesson.getVocabularies().size();
        int grammarCount = lesson.getGrammars().size();
        int kanjiCount = lesson.getKanjis().size();
        return vocabCount + grammarCount + kanjiCount;
    }
}