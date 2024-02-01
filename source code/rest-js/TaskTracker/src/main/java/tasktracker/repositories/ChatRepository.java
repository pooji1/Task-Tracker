package tasktracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import tasktracker.models.ChatModel;
import tasktracker.models.UserModel;

public interface ChatRepository extends JpaRepository<ChatModel, Long> {

	List<ChatModel> findByMesssageFromAndMessageToOrMesssageFromAndMessageTo(UserModel userModel, UserModel userModel2,
			UserModel userModel22, UserModel userModel3);

}
