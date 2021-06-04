package com.bikenest.servicebikenest.integration;

import com.bikenest.common.security.ServiceAuthentication;
import com.bikenest.servicebikenest.ServicebikenestApplication;
import com.bikenest.servicebikenest.controllers.BikenestController;
import org.junit.BeforeClass;
import org.junit.ClassRule;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.util.TestPropertyValues;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.testcontainers.containers.DockerComposeContainer;
import org.testcontainers.containers.wait.strategy.Wait;
import org.testcontainers.containers.wait.strategy.WaitAllStrategy;
import org.testcontainers.containers.wait.strategy.WaitStrategy;

import java.io.File;

@RunWith(SpringRunner.class)
@SpringBootTest
class BikenestControllerTest {

    @Test
    void dummyTest() {
        assert(true);
    }

}
