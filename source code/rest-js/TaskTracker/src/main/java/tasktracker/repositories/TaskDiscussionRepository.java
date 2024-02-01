package tasktracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import tasktracker.models.TaskDiscussionModel;
import tasktracker.models.TaskModel;
import tasktracker.models.UserModel;

public interface TaskDiscussionRepository extends JpaRepository<TaskDiscussionModel, Long> {

	List<TaskDiscussionModel> findByTaskModel(TaskModel taskModel);

	TaskDiscussionModel findByUserModelAndTaskModel(UserModel userModel, TaskModel taskModel);

}
