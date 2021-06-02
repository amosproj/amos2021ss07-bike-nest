package com.bikenest.common.interfaces;

public class GeneralExceptionResponse {
    private Boolean success;
    private String error;

    public GeneralExceptionResponse(boolean success, String error){
        this.success = success;
        this.error = error;
    }
    public GeneralExceptionResponse(){}

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
