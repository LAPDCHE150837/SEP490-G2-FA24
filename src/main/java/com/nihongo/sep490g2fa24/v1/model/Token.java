package com.nihongo.sep490g2fa24.v1.model;

import com.nihongo.sep490g2fa24.v1.dtos.tokens.TokenType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@Entity
@Table(name = "token")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false, length = 36)
    private String id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Size(max = 1000)
    @NotNull
    @Column(name = "access_token", nullable = false, length = 1000)
    private String accessToken;

    @Size(max = 1000)
    @Column(name = "refresh_token", length = 1000)
    private String refreshToken;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "revoked", nullable = false)
    private Boolean revoked = false;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "expired", nullable = false)
    private Boolean expired = false;

    @Column(name = "token_type", length = 50)
    @Enumerated(EnumType.STRING)
    private TokenType tokenType = TokenType.BEARER;

}