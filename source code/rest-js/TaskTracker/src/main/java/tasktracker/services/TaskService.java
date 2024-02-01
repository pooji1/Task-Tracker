package tasktracker.services;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Base64;
import java.util.Date;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import tasktracker.models.GroupMemberModel;
import tasktracker.models.GroupModel;
import tasktracker.models.TaskDiscussionModel;
import tasktracker.models.TaskModel;
import tasktracker.models.UserModel;
import tasktracker.repositories.GroupMemberRepository;
import tasktracker.repositories.GroupRepository;
import tasktracker.repositories.TaskDiscussionRepository;
import tasktracker.repositories.TaskRepository;
import tasktracker.repositories.UserRepository;

@Service
@Transactional

public class TaskService {
	@Autowired
	private TaskRepository taskRepository;
	@Autowired
	private GroupMemberRepository groupMemberRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private TaskDiscussionRepository taskDiscussionRepository;
	@Autowired
	private GroupRepository groupRepository;
	@Value("${taskPath}")
	String taskPath;

	public String assignTask(TaskModel taskModel, long userId, String name) {
		UserModel userModel3 = userRepository.findById(userId).get();
		GroupMemberModel groupMemberModel = groupMemberRepository.findByUserModel(userModel3).get(0);
		UserModel userModel = userRepository.findByEmail(name);
		UserModel userModel2 = userRepository.findById(userId).get();
		taskModel.setStatus("TO-DO");
		taskModel.setGroupMemberModel(groupMemberModel);
		taskModel.setUserModel(userModel2);
		taskModel.setUserModel2(userModel);
		taskModel.setAssignedDate(new Date());
		taskModel.setPercentageOfCompletion(0);
		taskRepository.saveAndFlush(taskModel);
		
		return "Task Assigned";
	}


	public List<TaskModel> assignedTasks(long groupMemberId, long userId) {
		GroupMemberModel groupMemberModel = groupMemberRepository.findById(groupMemberId).get();
		UserModel userModel = userRepository.findById(userId).get();
		List<TaskModel> taskModelsList = taskRepository.findByGroupMemberModelAndUserModel(groupMemberModel,userModel);
		return taskModelsList;
	}


	public TaskModel assignedTasks1(long taskId,String email) {
		UserModel userModel = userRepository.findByEmail(email);
		TaskModel taskModel = taskRepository.findById(taskId).get();
		if(userModel.getUserId()==taskModel.getUserModel2().getUserId()) {
			taskModel.setCreater(true);
		}else {
			taskModel.setCreater(false);
		}
		try {
			 File file=new File(taskPath+"/"+taskModel.getDocs());
			 InputStream in = new FileInputStream(file);
			 taskModel.setDocs2(Base64.getEncoder().encodeToString(IOUtils.toByteArray(in)));
			 
			 } catch (Exception e) {
		 }
		return taskModel;
	}


	public String updateTaskcomplStatus(long taskId, int percentageOfCompletion) {
		TaskModel taskModel = taskRepository.findById(taskId).get();
		taskModel.setPercentageOfCompletion(percentageOfCompletion);
		taskRepository.saveAndFlush(taskModel);
		return "Status Updated";
	}


	public String startTask(long taskId) {
		TaskModel taskModel  = taskRepository.findById(taskId).get();
		taskModel.setStatus("In Progress");
		taskRepository.saveAndFlush(taskModel);
		return "Task Started";
	}


	public String sentToQA(long taskId) {
		TaskModel taskModel  = taskRepository.findById(taskId).get();
		taskModel.setStatus("QA");
		taskRepository.saveAndFlush(taskModel);
		return "Sent To QA";
	}


	public String markAsDone(long taskId) {
		TaskModel taskModel = taskRepository.findById(taskId).get();
		taskModel.setStatus("Done");
		return "Done";
	}


	public String raiseBug(String bugComment, long taskId,String email) {
		TaskModel taskModel = taskRepository.findById(taskId).get();
		taskModel.setStatus("In Progress");
		taskRepository.saveAndFlush(taskModel);
		UserModel userModel = userRepository.findByEmail(email);
		TaskDiscussionModel taskDiscussionModel = new TaskDiscussionModel();
		taskDiscussionModel.setBugComment(bugComment);
		taskDiscussionModel.setDate(new Date());
		taskDiscussionModel.setTaskModel(taskModel);
		taskDiscussionModel.setUserModel(userModel);
		taskDiscussionRepository.saveAndFlush(taskDiscussionModel);
		return "Task Re-Assigned";
	}


	public List<TaskModel> groupTasks(long groupId) {
		GroupModel groupModel = groupRepository.findById(groupId).get();
		List<GroupMemberModel> groupMemberModelList = groupMemberRepository.findByGroupModel(groupModel);
		List<TaskModel> taskModelsList = taskRepository.findByGroupMemberModelIn(groupMemberModelList);
		
		return taskModelsList;
	}
	

}
