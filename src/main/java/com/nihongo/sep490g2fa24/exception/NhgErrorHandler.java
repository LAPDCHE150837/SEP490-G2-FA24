package com.nihongo.sep490g2fa24.exception;

import com.nihongo.sep490g2fa24.utils.BeanUtils;
import com.nihongo.sep490g2fa24.utils.MessageUtils;

public enum NhgErrorHandler implements INhgErrorHandler {
    SYSTEM_ERROR("MEA0000011", "common.BaseApiResponse.systemError"),
    INVALID_INPUT("MEA000001", "common.apiResponse.invalidInput" ),
    UNAUTHORIZED("Unauthorized", "common.apiResponse.unauthorized"),;
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