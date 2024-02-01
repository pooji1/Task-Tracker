package tasktracker.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import tasktracker.models.TaskDiscussionModel;
import tasktracker.models.TaskModel;
import tasktracker.models.UserModel;
import tasktracker.repositories.TaskDiscussionRepository;
import tasktracker.repositories.TaskRepository;
import tasktracker.repositories.UserRepository;

@Service
@Transactional
public class TaskDiscussionService {
	@Autowired
	private TaskDiscussionRepository taskDiscussionRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private TaskRepository taskRepository;

	public String taskDiscussion(String discussions, long taskId, String name) {
		TaskModel taskModel = taskRepository.findById(taskId).get();
		UserModel userModel = userRepository.findByEmail(name);
		TaskDiscussionModel taskDiscussionModel = new TaskDiscussionModel();
		taskDiscussionModel.setDiscussions(discussions);
		taskDiscussionModel.setUserModel(userModel);
		taskDiscussionModel.setTaskModel(taskModel);
		taskDiscussionModel.setDate(new Date());
		taskDiscussionRepository.save(taskDiscussionModel);
		return "Message Sent";
	}

	public List<TaskDiscussionModel> viewtaskDiscussion(long taskId) {
		TaskModel taskModel  = taskRepository.findById(taskId).get();
		List<TaskDiscussionModel> taskDiscussionModelList = taskDiscussionRepository.findByTaskModel(taskModel);
		return taskDiscussionModelList;
	}

}
