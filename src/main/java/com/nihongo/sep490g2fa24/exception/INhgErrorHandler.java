package com.nihongo.sep490g2fa24.exception;

public interface INhgErrorHandler {
    String getCode();

    String getMessage();

    default String getMessage(Object... args) {
        return this.getMessage();
    }
}
