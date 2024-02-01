package tasktracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import tasktracker.models.CredentialsModel;


public interface LoginRepository extends JpaRepository<CredentialsModel, Long>{


	CredentialsModel findByUsername(String email);



}
