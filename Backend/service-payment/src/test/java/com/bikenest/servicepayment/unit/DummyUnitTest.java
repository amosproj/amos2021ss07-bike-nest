package com.bikenest.servicepayment.unit;

import com.bikenest.servicepayment.ServicepaymentApplication;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes= ServicepaymentApplication.class)
public class DummyUnitTest {
    @Test
    void dummyTest(){}
}
