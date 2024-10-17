package com.nihongo.sep490g2fa24.exception;

import lombok.Getter;

import java.util.function.Supplier;

@Getter
public class NhgClientException extends RuntimeException {

    private final String errorCode;
    private final String errorMessage;

    public NhgClientException(String errorCode, String errorMessage) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
    public static NhgClientException ofHandler(INhgErrorHandler error) {
        return new NhgClientException(error.getCode(), error.getMessage());
    }
    public static NhgClientException ofHandler(INhgErrorHandler error, Object... errorDescArgs) {
        String message = error.getMessage();
        String errorMessage = String.format(message, errorDescArgs);
        return new NhgClientException(error.getCode(), errorMessage);
    }
    public static Supplier<NhgClientException> supplier(INhgErrorHandler error, Object... errorDescArgs) {
        return () -> ofHandler(error, errorDescArgs);
    }
    public static Supplier<NhgClientException> supplier(INhgErrorHandler error) {
        return () -> ofHandler(error);
    }

}
