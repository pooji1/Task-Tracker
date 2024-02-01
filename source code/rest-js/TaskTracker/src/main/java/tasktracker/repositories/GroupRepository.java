package tasktracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import tasktracker.models.GroupModel;
import tasktracker.models.UserModel;

public interface GroupRepository extends JpaRepository<GroupModel, Long> {

	List<GroupModel> findByUserModel(UserModel userModel);

}
