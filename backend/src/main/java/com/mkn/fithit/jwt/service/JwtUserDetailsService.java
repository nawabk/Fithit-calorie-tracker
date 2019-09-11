package com.mkn.fithit.jwt.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mkn.fithit.jwt.model.ApplicationUser;
import com.mkn.fithit.jwt.model.ApplicationUserDTO;
import com.mkn.fithit.jwt.repository.ApplicationUserRepository;



@Service
public class JwtUserDetailsService implements UserDetailsService {
	
	@Autowired
	private ApplicationUserRepository applicationUserRepository;

	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		ApplicationUser user = this.applicationUserRepository.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
				new ArrayList<>());
	}

	public ApplicationUser save(ApplicationUserDTO user) {
		ApplicationUser checkUser = this.applicationUserRepository.findByUsername(user.getUsername());
		if(checkUser!=null) throw new BadCredentialsException("Email_Already_Exist");
		ApplicationUser newUser = new ApplicationUser();
		newUser.setUsername(user.getUsername());
		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
		newUser.setEmail(user.getEmail());
		return this.applicationUserRepository.save(newUser);
	}
}
