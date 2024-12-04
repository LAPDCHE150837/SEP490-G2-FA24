package com.nihongo.sep490g2fa24.v1.repositories;

import com.nihongo.sep490g2fa24.v1.model.Flashcard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface FlashcardRepository extends JpaRepository<Flashcard, String> {
    List<Flashcard> findBySetId(String setId);

    List<Flashcard> findBySetIdAndMemorized(String set_id, boolean memorized);
}