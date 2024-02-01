package tasktracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import tasktracker.models.UserModel;

public interface UserRepository extends JpaRepository<UserModel, Long> {

	UserModel findByEmail(String email);

	List<UserModel> findByEmailOrPhone(String email, String phone);


	List<UserModel> findByPhone(String phone);

    @Query(value = "select * from user where user_id != ?1 and (email = ?2 or phone = ?2 or name=?2)",nativeQuery = true)
	List<UserModel> getUserDetails(long userId, String searchKeyword);



	

}
