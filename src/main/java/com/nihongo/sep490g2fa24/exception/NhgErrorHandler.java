package com.nihongo.sep490g2fa24.exception;

import com.nihongo.sep490g2fa24.utils.BeanUtils;
import com.nihongo.sep490g2fa24.utils.MessageUtils;

public enum NhgErrorHandler implements INhgErrorHandler{
    SYSTEM_ERROR("MEA0000011", "common.BaseApiResponse.systemError"),
    INVALID_INPUT("MEA000001", "common.apiResponse.invalidInput" ),
    UNAUTHORIZED("Unauthorized", "common.apiResponse.unauthorized"),
    LOGIN_ERROR("MEI009023", "Login error" ),
    USERNAME_NOT_FOUND("MEA000002", "common.apiResponse.usernameNotFound" ),
    INVALID_CREDENTIALS("MEA000003", "common.apiResponse.invalidCredentials" ),
    TOKEN_INVALID("MEA000003", "common.apiResponse.tokenInvalid" ),
    USER_IS_EXISTED("MEA000004", "common.apiResponse.userIsExisted" ),
    SEND_MAIL_ERROR("MEA000005", "common.apiResponse.sendMailError"),
    USER_IS_VERIFIED("MEA000006", "common.apiResponse.userIsVerified" ),
    INVALID_PASSWORD("MEA000007", "common.apiResponse.invalidPassword" ),
    INVALID_ROLE("MEA000008","common.apiResponse.invalidRole" ),
    EMAIL_NOT_FOUND("MEA000009", "common.apiResponse.emailNotFound");

    private final String code;
    private final String message;

    NhgErrorHandler(String code, String message) {
        this.code = code;
        this.message = message;
    }

    @Override
    public String getCode() {
        return this.code;
    }

    @Override
    public String getMessage() {
        MessageUtils messageUtils = BeanUtils.getBean(MessageUtils.class);
        return messageUtils.getMessage(this.message);
    }
}