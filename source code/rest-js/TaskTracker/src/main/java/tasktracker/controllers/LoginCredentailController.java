package tasktracker.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import tasktracker.models.CredentialsModel;
import tasktracker.services.CredentialsService;




@RestController
public class LoginCredentailController{
	@Autowired
	private CredentialsService loginService;
	@PostMapping("userLogin")
	public ResponseEntity<String> userLogin(@RequestBody CredentialsModel loginCredentialsModel) {
		System.out.println(loginCredentialsModel.getUsername());
		return loginService.loginAction(loginCredentialsModel);
	}

	
	
	
	

}
