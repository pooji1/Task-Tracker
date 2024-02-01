package tasktracker.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import tasktracker.models.TaskDiscussionModel;
import tasktracker.services.TaskDiscussionService;

@RestController
public class TaskDiscussionController {
	@Autowired
	private TaskDiscussionService taskDiscussionService;
	
	@GetMapping("taskDiscussion")
	public String taskDiscussion(@RequestParam("taskId") long taskId,@RequestParam("discussions") String discussions,Principal principal) {
		return taskDiscussionService.taskDiscussion(discussions,taskId,principal.getName());
	}
	
	@GetMapping("viewtaskDiscussion")
	public List<TaskDiscussionModel> viewtaskDiscussion(@RequestParam("taskId") long taskId){
		return taskDiscussionService.viewtaskDiscussion(taskId);
	}

}
