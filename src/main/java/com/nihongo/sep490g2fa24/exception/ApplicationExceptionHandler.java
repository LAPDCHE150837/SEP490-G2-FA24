package com.nihongo.sep490g2fa24.exception;

import com.nihongo.sep490g2fa24.exception.model.NhgError;
import com.nihongo.sep490g2fa24.utils.ErrorMappingUtils;
import com.nihongo.sep490g2fa24.utils.MessageUtils;
import com.nihongo.sep490g2fa24.v1.controllers.BaseApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.lang.reflect.UndeclaredThrowableException;
import java.time.format.DateTimeParseException;
import java.util.List;

@ControllerAdvice
public class ApplicationExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(ApplicationExceptionHandler.class);
    private final MessageUtils messageUtils;

    public ApplicationExceptionHandler(MessageUtils messageUtils) {
        this.messageUtils = messageUtils;
    }

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<Object> handleException(Exception e) {
        log.error("Error occurred: ", e);
        return new ResponseEntity<>(BaseApiResponse.failedOfBadRequest(NhgErrorHandler.SYSTEM_ERROR), HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<Object> handle(MissingServletRequestParameterException e) {
        String paramName = e.getParameterName();
        String error = this.messageUtils.getMessage("common.BaseApiResponse.requiredParam", paramName);
        return new ResponseEntity<>(BaseApiResponse.failedOfBadRequest(this.toError(NhgErrorHandler.INVALID_INPUT.getCode(), error)), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({UndeclaredThrowableException.class})
    protected ResponseEntity<Object> handleUndeclaredException(UndeclaredThrowableException e) {
        Throwable cause = e.getCause();
        if (cause instanceof NhgClientException ex) {
            return this.handleNhgClientException(ex);
        } else {
            log.error("UndeclaredThrowableException occurred", e);
            return this.handleException(e);
        }
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    protected ResponseEntity<Object> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        BindingResult result = e.getBindingResult();
        List<FieldError> fieldErrors = result.getFieldErrors();
        String finalMessage;
        if (fieldErrors.isEmpty()) {
            finalMessage = e.getBindingResult().getAllErrors().get(0).getDefaultMessage();
        } else {
            FieldError fieldError = fieldErrors.get(0);
            String var10000 = fieldError.getField();
            finalMessage = var10000 + " " + fieldError.getDefaultMessage();
        }

        log.error("Error MethodArgumentNotValidException: {}", finalMessage);
        return new ResponseEntity<>(BaseApiResponse.failedOfBadRequest(this.toError(NhgErrorHandler.INVALID_INPUT.getCode(), finalMessage)), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({HttpRequestMethodNotSupportedException.class})
    protected ResponseEntity<Object> handleMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
        return new ResponseEntity<>(BaseApiResponse.failedOfBadRequest(this.toError(NhgErrorHandler.INVALID_INPUT.getCode(), e.getMessage())), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({HttpMessageNotReadableException.class})
    protected ResponseEntity<Object> handleMessageNotReadableException(HttpMessageNotReadableException e) {
        log.error("Error HttpMessageNotReadableException: {}", e.getMessage());
        if (e.getCause().getCause() instanceof DateTimeParseException cause) {
            String message = this.messageUtils.getMessage("common.BaseApiResponse.invalidDate", cause.getParsedString());
            return new ResponseEntity<>(BaseApiResponse.failedOfBadRequest(this.toError(NhgErrorHandler.INVALID_INPUT.getCode(), message)), HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(BaseApiResponse.failedOfBadRequest(this.toError(NhgErrorHandler.INVALID_INPUT.getCode(), e.getMessage())), HttpStatus.BAD_REQUEST);
        }
    }

    @ExceptionHandler({NhgClientException.class})
    protected ResponseEntity<Object> handleNhgClientException(NhgClientException exception) {
        NhgError error = ErrorMappingUtils.getError(exception.getErrorCode());
        return new ResponseEntity<>(BaseApiResponse.failedOfBadRequest(this.toError(error.getErrorCode(), exception.getErrorMessage())), HttpStatus.BAD_REQUEST);
    }

    private INhgErrorHandler toError(final String code, final String message) {
        return new INhgErrorHandler() {
            @Override
            public String getCode() {
                return code;
            }

            @Override
            public String getMessage() {
                return message;
            }
        };
    }
}
