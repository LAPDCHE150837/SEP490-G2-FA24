package com.nihongo.sep490g2fa24.v1.repositories;

import com.nihongo.sep490g2fa24.v1.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserVocabularyRepository extends JpaRepository<UserVocabulary, String> {

    boolean existsByUserAndVocabulary(User user, Vocabulary vocabulary);

    @Query("SELECT u.isLearning FROM UserVocabulary u WHERE u.user = :user AND u.vocabulary = :vocabulary")
    Optional<Boolean> findByUserAndVocabulary2(@Param("user") User user, @Param("vocabulary") Vocabulary vocabulary);

    @Query("SELECT u.isLearning FROM UserGrammar u WHERE u.user = :user AND u.grammar = :grammar")
    Optional<Boolean> findByUserAndGrammar(@Param("user") User user, @Param("grammar") Grammar grammar);


    @Query("SELECT u.isLearning FROM UserKanji u WHERE u.user = :user AND u.kanji = :kanji")
    Optional<Boolean> findByUserAndKanji(@Param("user") User user, @Param("kanji") Kanji kanji);



    Optional<UserVocabulary> findByUserAndVocabulary(User user, Vocabulary vocabulary);

    @Query("""
    SELECT (
        SELECT COUNT(uv.user.id) 
        FROM UserVocabulary uv 
        WHERE uv.isLearning = true AND uv.user.id = :userId AND uv.vocabulary.lesson.id = :lessonId
    ) + (
        SELECT COUNT(uk.user.id)
        FROM UserKanji uk 
        WHERE uk.isLearning = true AND uk.user.id = :userId AND uk.kanji.lesson.id = :lessonId
    ) + (
        SELECT COUNT(ug.user.id)
        FROM UserGrammar ug 
        WHERE ug.isLearning = true AND ug.user.id = :userId AND ug.grammar.lesson.id = :lessonId
    )
""")
    Long countLearningForUser(@Param("userId") String userId, @Param("lessonId") String lessonId);


    @Query("""
 SELECT (
        SELECT COUNT(uv.user.id) 
        FROM UserVocabulary uv 
        WHERE uv.isLearning = true AND uv.user.id = :userId AND uv.vocabulary.lesson.course.id = :courseId
    ) + (
        SELECT COUNT(uk.user.id)
        FROM UserKanji uk 
        WHERE uk.isLearning = true AND uk.user.id = :userId AND uk.kanji.lesson.course.id = :courseId
    ) + (
        SELECT COUNT(ug.user.id)
        FROM UserGrammar ug 
        WHERE ug.isLearning = true AND ug.user.id = :userId AND ug.grammar.lesson.course.id = :courseId
    )
""")
    Long countLearningCourseForUser(@Param("userId") String userId,@Param("courseId") String courseId);
}

