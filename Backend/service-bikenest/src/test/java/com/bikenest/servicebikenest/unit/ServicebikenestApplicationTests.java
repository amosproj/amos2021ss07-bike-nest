package com.bikenest.servicebikenest.unit;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes=ServicebikenestApplicationTests.class)
class ServicebikenestApplicationTests {

    @Test
    void dummyTest() {
        assert(true == (1==1));
    }

}
