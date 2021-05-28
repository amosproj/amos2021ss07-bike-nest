package com.bikenest.common.interfaces.usermgmt;

import javax.validation.constraints.*;

public class ChangePasswordRequest {
    @NotBlank
    private String oldPassword;

    @NotBlank
    @Size(min = 6, max = 40)
    private String newPassword;

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

}
