package com.bikenest.common.interfaces.booking;

import javax.validation.constraints.NotBlank;

public class QRCodeRequest {
    @NotBlank
    private String qrCode;

    public QRCodeRequest(){}
    public QRCodeRequest(String qrCode){
        this.qrCode = qrCode;
    }

    public String getQrCode() {
        return qrCode;
    }

    public void setQrCode(String qrCode) {
        this.qrCode = qrCode;
    }
}
