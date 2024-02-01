package tasktracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import tasktracker.models.GroupMemberModel;
import tasktracker.models.GroupModel;
import tasktracker.models.UserModel;

public interface GroupMemberRepository extends JpaRepository<GroupMemberModel, Long> {


	List<GroupMemberModel> findByGroupModel(GroupModel groupModel);

	List<GroupMemberModel> findByGroupModelAndStatus(GroupModel groupModel, String string);

	List<GroupMemberModel> findByUserModel(UserModel userModel);

	List<GroupMemberModel> findByGroupModelAndUserModelNot(GroupModel groupModel, UserModel userModel);

	List<GroupMemberModel> findByUserModelAndStatus(UserModel userModel, String string);

	List<GroupMemberModel> findByUserModelAndGroupModel(UserModel userModel, GroupModel groupModel);






}
