package com.bikenest.common.interfaces.usermgmt;

/**
 * This class is also used as Response for Signup, because it's exactly the same.
 */
public class SigninResponse {
    private boolean success;
    private String error;
    private String jwt;

    public SigninResponse(boolean success, String error, String jwt){
        this.success = success;
        this.error = error;
        this.jwt = jwt;
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

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }
}
