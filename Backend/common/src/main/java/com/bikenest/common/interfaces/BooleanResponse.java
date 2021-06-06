package com.bikenest.common.interfaces;

public class BooleanResponse {
    private Boolean success;

    public BooleanResponse(){}

    public BooleanResponse(Boolean success){
        this.success = success;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }
}
