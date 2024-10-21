package com.nihongo.sep490g2fa24.v1.event.listener;

import com.nihongo.sep490g2fa24.config.JwtService;
import com.nihongo.sep490g2fa24.v1.event.RegistrationCompleteEvent;
import com.nihongo.sep490g2fa24.v1.model.User;
import com.nihongo.sep490g2fa24.v1.services.AuthenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class RegistrationCompleteEventListener implements ApplicationListener<RegistrationCompleteEvent> {
    private final AuthenService authenService;
    private final JwtService jwtService;

    User user;
    @Override
    public void onApplicationEvent(RegistrationCompleteEvent event) {
        user = event.getUser();
        String jwtToken= jwtService.generateToken(user);
        authenService.saveUserToken(user, jwtToken);
        String url = event.getApplicationUrl() + "/api/v1/auth/verifyEmail?token=" + jwtToken;
//        try {
//            sendVerificationEmail(url);
//        } catch (MessagingException | UnsupportedEncodingException e) {
//            throw NhgClientException.ofHandler();
//        }
        log.info("Click the link to verify your registration :  {}", url);

    }
}
