package tasktracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import tasktracker.models.GroupChatModel;
import tasktracker.models.GroupModel;

public interface GroupChatRepository extends JpaRepository<GroupChatModel, Long> {

	List<GroupChatModel> findByGroupModel(GroupModel groupModel);

}
