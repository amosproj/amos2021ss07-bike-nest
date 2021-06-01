package com.bikenest.servicepayment.services;

import com.braintreegateway.*;
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

    /**
     * We have to register a customer with Braintree. This customer will have a specific id that can be used for further calls to Braintree.
     * We can chose this id individually or let it be autogenerated from Braintree. Currently we just use the userId that we already have
     * stored in our own User Database as id, so if we want to do a request to Braintree, we just need to get the userId from the JWT.
     * @param userId Id of the user as stored in our User Database (see UserMgmt Service).
     * @return Success status of the request to Braintree.
     */
    public boolean createCustomer(Integer userId, String firstName, String lastName, String email){
        CustomerRequest customerRequest = new CustomerRequest()
                                                .id(String.valueOf(userId))
                                                .firstName(firstName)
                                                .lastName(lastName)
                                                .email(email);
        Result<Customer> customerResult = gateway.customer().create(customerRequest);
        return customerResult.isSuccess();
    }
}
