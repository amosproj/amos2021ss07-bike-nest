package com.bikenest.servicepayment.services;

import com.braintreegateway.BraintreeGateway;
import com.braintreegateway.ClientTokenRequest;
import com.braintreegateway.Environment;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    private String merchantId;
    private String publicKey;
    private String privateKey;

    private BraintreeGateway gateway;

    public PaymentService(){
        merchantId = System.getenv("BT_MERCHANT_ID");
        publicKey = System.getenv("BT_PUBLIC_KEY");
        privateKey = System.getenv("BT_PRIVATE_KEY");
        if (merchantId == null || publicKey == null || privateKey == null){
            throw new IllegalArgumentException("A Braintree Environment Variable is not correctly set. Check your .env file!");
        }
        if(merchantId.equals("FILL_THIS") || publicKey.equals("FILL_THIS") || privateKey.equals("FILL_THIS")){
            throw new IllegalArgumentException("A Braintree Environment Variable is still set to the default value 'FILL_THIS'." +
                    "Replace it with a valid value.");
        }

        gateway = new BraintreeGateway(Environment.SANDBOX, merchantId, publicKey, privateKey);
    }

    public String generateClientToken(Integer userId){
        ClientTokenRequest clientTokenRequest = new ClientTokenRequest().customerId(String.valueOf(userId));
        return gateway.clientToken().generate(clientTokenRequest);
    }
}
