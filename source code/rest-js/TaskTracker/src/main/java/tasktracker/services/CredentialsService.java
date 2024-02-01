package tasktracker.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;


import jakarta.transaction.Transactional;
import tasktracker.models.CredentialsModel;
import tasktracker.security.JwtTokenUtil;


@Service
@Transactional
public class CredentialsService {
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private LoginCredentialsService loginCredentialsService;
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	public ResponseEntity<String> loginAction(CredentialsModel credentialsModel)  {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(credentialsModel.getUsername(),credentialsModel.getPassword()));
		} catch (DisabledException e) {
			return ResponseEntity.ok("User Disabled");
		} catch (BadCredentialsException e) {
			return ResponseEntity.ok("Invalid Login Details");
		} catch (Exception e) {
			return ResponseEntity.ok("Invalid Login Details");
		}
		final UserDetails userDetails = loginCredentialsService.loadUserByUsername(credentialsModel.getUsername());
		final String token = jwtTokenUtil.generateToken(userDetails);
		
		return ResponseEntity.ok(token);
	}
	

}
