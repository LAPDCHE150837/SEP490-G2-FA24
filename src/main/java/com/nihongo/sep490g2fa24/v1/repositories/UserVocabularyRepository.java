package com.nihongo.sep490g2fa24.v1.repositories;

import com.nihongo.sep490g2fa24.v1.model.User;
import com.nihongo.sep490g2fa24.v1.model.UserVocabulary;
import com.nihongo.sep490g2fa24.v1.model.Vocabulary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserVocabularyRepository extends JpaRepository<UserVocabulary, String> {

    boolean existsByUserAndVocabulary(User user, Vocabulary vocabulary);

    Optional<UserVocabulary> findByUserAndVocabulary(User user, Vocabulary vocabulary);
}
