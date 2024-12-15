package com.nihongo.sep490g2fa24.v1.repositories;


import com.nihongo.sep490g2fa24.v1.model.Kanji;
import com.nihongo.sep490g2fa24.v1.model.User;
import com.nihongo.sep490g2fa24.v1.model.UserKanji;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserKanjiRepository extends JpaRepository<UserKanji, String> {
    Optional<UserKanji> findByUserAndKanji(User user, Kanji kanji);

    boolean existsByUserAndKanji(User user, Kanji kanji);
}
