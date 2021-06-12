package com.bikenest.servicebikenest.integration;

import com.bikenest.common.interfaces.bikenest.AddBikenestRequest;
import com.bikenest.servicebikenest.db.Bikenest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.DefaultResponseErrorHandler;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;

public class ClientHelper {
    private TestRestTemplate testRestTemplate;

    public void initialize(int serverPort){
        RestTemplateBuilder customTemplate = new RestTemplateBuilder()
                .rootUri("http://localhost:" + serverPort)
                .errorHandler(new DefaultResponseErrorHandler() {
                    public boolean hasError(ClientHttpResponse response) throws IOException {
                        // HttpStatus statusCode = response.getStatusCode();
                        // return statusCode.series() == HttpStatus.Series.SERVER_ERROR;
                        // We actually don't want to throw any error if a satus code is not 2XX
                        return false;
                    }
                });

        this.testRestTemplate = new TestRestTemplate(customTemplate);
        this.testRestTemplate.getRestTemplate().setRequestFactory(new HttpComponentsClientHttpRequestFactory());
    }

    private <T> HttpEntity<T> getHttpEntity(T t, String jwt){
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", jwt);

        return new HttpEntity<>(t, headers);
    }

    public ResponseEntity<Bikenest> addBikenest(AddBikenestRequest addBikenestRequest, String jwt){
        return this.testRestTemplate.postForEntity("/api/service-bikenest/bikenest/add", getHttpEntity(addBikenestRequest, jwt), Bikenest.class);
    }

    public ResponseEntity<List<LinkedHashMap>> getAllBikenests(){
        Class<List<LinkedHashMap>> c = (Class<List<LinkedHashMap>>)(Class<?>)List.class;
        return this.testRestTemplate.getForEntity("/api/service-bikenest/bikenest/all", c);
    }

    public ResponseEntity<Boolean> deleteAllBikenests(String jwt){
        return this.testRestTemplate.exchange("/api/service-bikenest/bikenest/deleteall", HttpMethod.GET, getHttpEntity(null, jwt), Boolean.class);
    }
}
