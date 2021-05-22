package com.bikenest.common.interfaces;

public class GeneralResponse {
    private boolean success;
    private String error;
    private Object payload;

    public GeneralResponse(boolean success, String error, Object payload){
        this.success = success;
        this.error = error;
        this.payload = payload;
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

    public Object getPayload() {
        return payload;
    }

    public void setPayload(Object payload) {
        this.payload = payload;
    }
}
