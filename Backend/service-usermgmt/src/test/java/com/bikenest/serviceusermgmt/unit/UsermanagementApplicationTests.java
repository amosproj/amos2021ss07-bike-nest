package com.bikenest.serviceusermgmt.unit;

import com.bikenest.common.exceptions.BusinessLogicException;
import com.bikenest.serviceusermgmt.UsermanagementApplication;
import com.bikenest.serviceusermgmt.models.User;
import com.bikenest.serviceusermgmt.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.test.context.ContextConfiguration;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
@ContextConfiguration(classes= UsermanagementApplication.class)
class UsermanagementApplicationTests {

    @InjectMocks
    UsermanagementApplication usermanagement;

    @Mock
	UserRepository userRepo;

    private User user = MockHelper.constructUser(
    		"Max", "Mustermann", "max@muster.de", "test12" );
  

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
		//TODO
	}

	@Test
	void loginUser() throws BusinessLogicException {
		//TODO
	}

	@Test
	void createAccount() throws BusinessLogicException{
		//TODO
	}

	@Test
	void changePassword() throws BusinessLogicException {
		//TODO
	}
		
	@Test
	void changePersonalInformation() throws BusinessLogicException {
		//TODO
	}

	// %%%% JWTService %%%%
	// buildJwtFromUser(User user)
	// buildAdminJwt()
	// validateJWT(String JWT)

	@Test
	void buildJWTFromUser() throws BusinessLogicException {
		//TODO
	}

	@Test
	void buildAdminJwt() throws BusinessLogicException {
		//TODO
	}

	@Test
	void validateJWT() throws BusinessLogicException {
		//TODO
	}

}
