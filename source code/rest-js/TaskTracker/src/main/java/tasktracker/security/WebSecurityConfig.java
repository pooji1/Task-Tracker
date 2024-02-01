package  tasktracker.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import tasktracker.services.LoginCredentialsService;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

	@Autowired
	private JwtAuthEntryPoint jwtAuthEntryPoint;

	@Autowired
	private JwtReqFilter jwtRequFilter;
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	UserDetailsService getLoginUserDetails() {
		return new LoginCredentialsService();
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(getLoginUserDetails()).passwordEncoder(passwordEncoder());
	}
	
   @Bean
   AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
       return authenticationConfiguration.getAuthenticationManager();
   }

   
	@Bean
	protected SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception {
		httpSecurity.csrf()
					.disable()
					.authorizeRequests()
					.requestMatchers("/verifyEmail", "/userRegistration","/userLogin","/CustomerLogin","/getHomePageMedicines")
					.permitAll().anyRequest().authenticated().and().exceptionHandling()
					.authenticationEntryPoint(jwtAuthEntryPoint).and().sessionManagement()
					.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		
		httpSecurity.addFilterBefore(jwtRequFilter, UsernamePasswordAuthenticationFilter.class);
		return httpSecurity.build();
	}
   
}