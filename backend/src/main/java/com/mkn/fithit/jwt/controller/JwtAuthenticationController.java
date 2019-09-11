package com.mkn.fithit.jwt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mkn.fithit.jwt.config.JwtTokenUtil;
import com.mkn.fithit.jwt.model.ApplicationUserDTO;
import com.mkn.fithit.jwt.model.JwtRequest;
import com.mkn.fithit.jwt.model.JwtResponse;
import com.mkn.fithit.jwt.service.JwtUserDetailsService;



@RestController
@CrossOrigin(origins="http://localhost:3000")
public class JwtAuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	@Autowired
	private JwtUserDetailsService userDetailsService;
	
	@PostMapping("/authenticate")
	public ResponseEntity<?> createdAuthenticationToken(@RequestBody JwtRequest authenticationRequest) 
	                                                    throws Exception{
		authenticate(authenticationRequest.getUsername(),authenticationRequest.getPassword());
		
		final UserDetails userDetails = userDetailsService
				                .loadUserByUsername(authenticationRequest.getUsername()	);
		final String token = jwtTokenUtil.generateToken(userDetails);
		return ResponseEntity.ok(new JwtResponse(token));
	}
	
	@PostMapping(value = "/register")
	public ResponseEntity<?> saveUser(@RequestBody ApplicationUserDTO user) throws Exception {
		return ResponseEntity.ok(userDetailsService.save(user));
	}

	
	private void authenticate(String userName,String password) throws Exception {
		try {
			this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName,password));
		}catch(BadCredentialsException 	e) {
			throw new Exception("INVALID_CREDENTIALS",e);
		}
	} 
}
