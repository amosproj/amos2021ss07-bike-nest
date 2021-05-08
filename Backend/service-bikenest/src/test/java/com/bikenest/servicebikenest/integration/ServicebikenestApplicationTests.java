package com.bikenest.servicebikenest.integration;

import com.bikenest.servicebikenest.ServicebikenestApplication;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

@SpringBootTest(classes = ServicebikenestApplication.class)
class ServicebikenestApplicationTests {

    @Test
    void dummyTest() {
        assert(true == (1==1));
    }

}
