package com.bikenest.common.interfaces;

public class GeneralExceptionResponse{
    private String error;
    public GeneralExceptionResponse(String error){
        this.error = error;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
