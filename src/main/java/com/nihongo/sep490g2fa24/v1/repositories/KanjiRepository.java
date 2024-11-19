package com.nihongo.sep490g2fa24.v1.repositories;

import com.nihongo.sep490g2fa24.v1.model.Kanji;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KanjiRepository extends JpaRepository<Kanji, String> {
}
