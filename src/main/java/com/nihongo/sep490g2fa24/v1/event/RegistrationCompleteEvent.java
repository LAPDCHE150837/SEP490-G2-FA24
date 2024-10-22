package com.nihongo.sep490g2fa24.v1.event;

import com.nihongo.sep490g2fa24.v1.model.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;
@Getter
@Setter
public class RegistrationCompleteEvent extends ApplicationEvent {
    private User user;
    private String applicationUrl;
    private String jwtToken;

    public RegistrationCompleteEvent(User user, String applicationUrl, String jwtToken) {
        super(user);
        this.user = user;
        this.applicationUrl = applicationUrl;
        this.jwtToken = jwtToken;
    }
}
