package com.nihongo.sep490g2fa24.v1.repositories;


import com.nihongo.sep490g2fa24.v1.model.Grammar;
import com.nihongo.sep490g2fa24.v1.model.User;
import com.nihongo.sep490g2fa24.v1.model.UserGrammar;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserGrammarRepository extends JpaRepository<UserGrammar, String> {
    Optional<UserGrammar> findByUserAndGrammar(User user, Grammar grammar);

    boolean existsByUserAndGrammar(User user, Grammar grammar);
}
