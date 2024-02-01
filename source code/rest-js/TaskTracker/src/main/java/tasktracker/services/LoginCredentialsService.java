package tasktracker.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;



import jakarta.transaction.Transactional;
import tasktracker.models.CredentialsModel;
import tasktracker.repositories.LoginRepository;
import tasktracker.security.JwtTokenUtil;

@Service
@Transactional
public class LoginCredentialsService implements UserDetailsService{
	@Autowired
	private LoginRepository loginRepository;
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		CredentialsModel usersModel  = loginRepository.findByUsername(email);
		if(usersModel == null) {
			throw new UsernameNotFoundException("Invalid Email Address") ;
		}
		List<SimpleGrantedAuthority> grantedAuthorities = new ArrayList<SimpleGrantedAuthority>();
		SimpleGrantedAuthority authority = new SimpleGrantedAuthority(usersModel.getRole());
		grantedAuthorities.add(authority);
		return new User(usersModel.getUsername(),usersModel.getPassword(),grantedAuthorities);
	}

	
	
	
	}
	
	
	


