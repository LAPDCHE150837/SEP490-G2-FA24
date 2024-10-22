package com.nihongo.sep490g2fa24.v1.event.listener;

import com.nihongo.sep490g2fa24.exception.NhgClientException;
import com.nihongo.sep490g2fa24.exception.NhgErrorHandler;
import com.nihongo.sep490g2fa24.utils.Constants;
import com.nihongo.sep490g2fa24.v1.event.RegistrationCompleteEvent;
import com.nihongo.sep490g2fa24.v1.model.User;
import com.nihongo.sep490g2fa24.v1.services.AuthenService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;

@Slf4j
@Component
@RequiredArgsConstructor

public class RegistrationCompleteEventListener implements ApplicationListener<RegistrationCompleteEvent> {
    private final AuthenService authenService;
    private final JavaMailSender mailSender;
    User user;
    @Override
    public void onApplicationEvent(RegistrationCompleteEvent event) {
        user = event.getUser();
        String jwtToken = event.getJwtToken();
        authenService.saveUserToken(user, jwtToken);
        String url = event.getApplicationUrl() + "/v1/auth/verifyEmail?token=" + jwtToken;
        try {
            sendVerificationEmail(url);
        } catch (MessagingException | UnsupportedEncodingException e) {
            throw NhgClientException.ofHandler(NhgErrorHandler.SEND_MAIL_ERROR);
        }
        log.info("Click the link to verify your registration :  {}", url);

    }
    public void sendVerificationEmail(String url) throws MessagingException, UnsupportedEncodingException {
        String subject = "Email Verification";
        String senderName = "User Registration Portal Service";
        String mailContent = "<p> Hi, " + user.getUsername() + ", </p>" +
                "<p>Thank you for registering with us, " +
                "Please, follow the link below to complete your registration.</p>" +
                "<a href=\"" + url + "\">Verify your email to activate your account</a>" +
                "<p> Thank you <br> Users Registration Portal Service";
        MimeMessage message = mailSender.createMimeMessage();
        var messageHelper = new MimeMessageHelper(message);
        messageHelper.setFrom(Constants.HOST_MAIL, senderName); //set = mail cua Lap
        messageHelper.setTo(user.getEmail());
        messageHelper.setSubject(subject);
        messageHelper.setText(mailContent, true);
        mailSender.send(message);
    }
}
