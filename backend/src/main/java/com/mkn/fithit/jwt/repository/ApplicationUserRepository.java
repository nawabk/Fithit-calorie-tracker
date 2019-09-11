/**
 * 
 */
package com.mkn.fithit.jwt.repository;

import org.springframework.data.repository.CrudRepository;

import com.mkn.fithit.jwt.model.ApplicationUser;

/**
 * @author Mdkhalid.N
 *
 */
public interface ApplicationUserRepository extends CrudRepository<ApplicationUser,Long> {
	ApplicationUser findByUsername(String username);

}
