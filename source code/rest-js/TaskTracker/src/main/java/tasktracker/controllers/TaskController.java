package tasktracker.controllers;

import java.io.File;
import java.io.FileOutputStream;
import java.security.Principal;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import tasktracker.models.TaskModel;
import tasktracker.services.TaskService;

@RestController
public class TaskController {
	@Autowired
	private TaskService taskService;
	@Value("${taskPath}")
	String taskPath;
	@RequestMapping(value = "assignTask", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public String  assignTask (
			@RequestParam(name="docs") MultipartFile multipartFile,
			@RequestParam String taskTitle,
			@RequestParam Date startDate,
			@RequestParam Date endDate,
			@RequestParam String priority,
			@RequestParam String description,
			@RequestParam long userId,
			Principal principal
			)
	{
		System.out.println(priority);
		try {
			File uploadedFile = new File(taskPath, multipartFile.getOriginalFilename());
			uploadedFile.createNewFile();
			FileOutputStream fos = new FileOutputStream(uploadedFile);
			fos.write(multipartFile.getBytes());
			fos.close();
			TaskModel taskModel = new TaskModel();
			taskModel.setDocs(multipartFile.getOriginalFilename());
			taskModel.setDescription(description);
			taskModel.setStartDate(startDate);
			taskModel.setEndDate(endDate);
			taskModel.setPriority(Integer.parseInt(priority));
			taskModel.setTaskTitle(taskTitle);
			return taskService.assignTask(taskModel,userId,principal.getName());
		} catch (Exception e) {
			System.out.println(e);
			return "Fail to upload";
		}
	}
	
	@GetMapping("assignedTasks")
	public List<TaskModel>  assignedTasks (@RequestParam("userId") long userId,@RequestParam("groupMemberId") long groupMemberId){
		return taskService.assignedTasks(groupMemberId,userId);
	}
	
	@GetMapping("assignedTasks1")
	public TaskModel assignedTasks1(@RequestParam("taskId") long taskId,Principal principal) {
		return taskService.assignedTasks1(taskId,principal.getName());
	}
	
	@GetMapping("updateTaskcomplStatus")
	public String updateTaskcomplStatus(@RequestParam("taskId") long taskId,@RequestParam("percentageOfCompletion") int percentageOfCompletion) {
		return taskService.updateTaskcomplStatus(taskId,percentageOfCompletion);
	}
	
	@GetMapping("startTask")
	public String startTask(@RequestParam("taskId") long taskId) {
		return taskService.startTask(taskId);
	}
	@GetMapping("sentToQA")
	public String sentToQA(@RequestParam("taskId") long taskId) {
		return taskService.sentToQA(taskId);
	}
	@GetMapping("markAsDone")
	public String markAsDone(@RequestParam("taskId") long taskId) {
		return taskService.markAsDone(taskId);
	}
	@GetMapping("raiseBug")
	public String raiseBug(@RequestParam("taskId") long taskId,@RequestParam("bugComment") String bugComment,Principal principal) {
		return taskService.raiseBug(bugComment,taskId,principal.getName());
	}
	@GetMapping("groupTasks")
	public List<TaskModel> groupTasks(@RequestParam("groupId") long groupId){
		return taskService.groupTasks(groupId);
	}
	
	
	
	

}
