package com.bikenest.common.exceptions;

import com.bikenest.common.interfaces.GeneralExceptionResponse;
import com.bikenest.common.interfaces.GeneralResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletRequest;

/**
 * This Global Exception Handlers should catch ALL of the Exceptions that happen in any microservice.
 * It will differentiate between BusinessLogicExceptions, that are thrown purposefully and other Exceptions
 * that happen accidently. In the case of an BusinessException, the Exception will contain a useful message, that
 * can be displayed to the user. In the other Case, we will just return "An Unknown error occured on the server."
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    /**
     * This ExceptionHandler catches all BusinessLogicExceptions and transforms then into a GeneralExceptionResponse.
     * The Response Code will be 422 (Unprocessable Entity) to indicate for the frontend, that a Business Logic error has
     * occurred.
     * @param request
     * @param ex
     * @return
     */
    @ExceptionHandler(BusinessLogicException.class)
    public ResponseEntity<GeneralExceptionResponse> handleBusinessLogicExceptions(HttpServletRequest request, BusinessLogicException ex){
        logger.info("BusinessLogicException:: URL=" + request.getRequestURL());
        logger.info("Message:: " + ex.getMessage());
        return ResponseEntity.unprocessableEntity().body(new GeneralExceptionResponse(false, ex.getMessage()));
    }

    /**
     * This will catch all other exceptions that might happen inside the controllers and that we are not aware off.
     * Therefore we cannot give a meaningful message back to the frontend and just state "An unknown error has occurred on
     * the server."
     * Response Code will be 500 (Internal Server Error)
     * @param request
     * @param ex
     * @return
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<GeneralExceptionResponse> handleOtherExceptions(HttpServletRequest request, Exception ex){
        logger.error("Unknown error occurred::" + ex.getMessage() + "\n Stacktrace::" + ex.getStackTrace());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new GeneralExceptionResponse(false, "Ein unbekannter Fehler ist im Server aufgetreten."));
    }

}
