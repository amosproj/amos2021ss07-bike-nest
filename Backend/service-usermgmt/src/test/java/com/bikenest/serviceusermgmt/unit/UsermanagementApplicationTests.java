package com.bikenest.serviceusermgmt.unit;

import com.bikenest.serviceusermgmt.UsermanagementApplication;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

package com.bikenest.serviceusermgmt.unit;

import com.bikenest.common.exceptions.BusinessLogicException;
import com.bikenest.common.interfaces.bikenest.AddBikenestRequest;

import com.bikenest.serviceusermgmt.UsermanagementApplication;

import com.bikenest.serviceusermgmt.db.UserRepository;

import com.bikenest.serviceusermgmt.services.AccountService;
import com.bikenest.serviceusermgmt.services.JWTService
;
import org.assertj.core.api.Assertions;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.test.context.ContextConfiguration;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.notNull;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
@ContextConfiguration(classes= UsermanagementApplication.class)
class UsermanagementApplicationTests {

    @InjectMocks
    UsermanagementApplication usermanagement;

    @Mock
    UserRepository userRepo;

    private User user = MockHelper.constructUser();
  

    @BeforeEach
    void setUpMocks() {
        MockitoAnnotations.openMocks(this);
        when(userRepo.save(any())).thenAnswer(i -> i.getArguments()[0]);
    }

	//User Management Tests: 
	// %%%% AccountService %%%%
	// existsAccountWithEmail(email)
	// loginUser(String email, String password)
	// createAccount(String email, String password, String firstName, String lastName)
	// changePassword(String email, String oldPassword, String newPassword)
	// changePersonalInformation(String password, String firstName, String lastName, String newEmail, String oldEmail)
	@Test
	void doesUserExist() throws BusinessLogicException {

	}

	@Test
	void loginUser() throws BusinessLogicException {

	}

	@Test
	void createAccount() throws BusinessLogicException{
		
	}

	@Test
	void changePassword() throws BusinessLogicException {

	}
		
	@Test
	void changePersonalInformation() throws BusinessLogicException {

	}

	// %%%% JWTService %%%%
	// buildJwtFromUser(User user)
	// buildAdminJwt()
	// validateJWT(String JWT)

	@Test
	void buildJWTFromUser() throws BusinessLogicException {

	}

	@Test
	void buildAdminJwt() throws BusinessLogicException {

	}

	@Test
	void validateJWT() throws BusinessLogicException {
		
	}

}
