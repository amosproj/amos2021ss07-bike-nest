package com.bikenest.common.interfaces.usermgmt;

public class SignUpResponse {
    private boolean success;
    private String error;

    public SignUpResponse(boolean success, String error){
        this.success = success;
        this.error = error;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
