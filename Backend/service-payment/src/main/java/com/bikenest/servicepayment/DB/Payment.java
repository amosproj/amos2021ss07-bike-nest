package com.bikenest.servicepayment.DB;

import javax.persistence.*;


@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;
    private Integer userId;
    private String iban;

    public Payment(Integer userId, String iban) {
        this.userId = userId;
        this.iban = iban;
    }

    public Payment(){}


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getIban(){
        return this.iban;
    }

    public void setIban(String iban){
        this.iban = iban;
    }
}
