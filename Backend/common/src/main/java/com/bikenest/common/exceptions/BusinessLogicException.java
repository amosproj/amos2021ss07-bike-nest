package com.bikenest.common.exceptions;

/**
 * This exception should be thrown anywhere, where some Business Logic fails.
 * Since the Exception will bubble up to the Controller, the GlobalExceptionHandler will
 * receive this Exception and bring it into the correct format for the Frontend.
 */
public class BusinessLogicException extends Exception {

    public BusinessLogicException(String message){
        super(message);
    }
}
