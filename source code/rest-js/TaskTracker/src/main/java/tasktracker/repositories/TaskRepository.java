package tasktracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import tasktracker.models.GroupMemberModel;
import tasktracker.models.TaskModel;
import tasktracker.models.UserModel;

public interface TaskRepository extends JpaRepository<TaskModel, Long> {

	List<TaskModel> findByGroupMemberModelAndUserModel(GroupMemberModel groupMemberModel, UserModel userModel);

	List<TaskModel> findByGroupMemberModel(GroupMemberModel groupMemberModel);


	List<TaskModel> findByGroupMemberModelIn(List<GroupMemberModel> groupMemberModelList);

}
