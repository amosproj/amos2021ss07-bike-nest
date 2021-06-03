package com.bikenest.common.interfaces;

public class GeneralExceptionResponse extends GeneralResponse{

    public GeneralExceptionResponse(String error){
        super(true, error, null);
    }
    public GeneralExceptionResponse(){
        super(true, "", null);
    }

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
