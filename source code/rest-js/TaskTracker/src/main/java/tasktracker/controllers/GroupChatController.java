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

import tasktracker.models.ChatModel;
import tasktracker.models.GroupChatModel;
import tasktracker.models.GroupModel;
import tasktracker.services.GroupChatService;

@RestController
public class GroupChatController {
	@Autowired
	private GroupChatService groupChatService;
	
	@GetMapping("sendGroupMessage")
	public String sendGroupMessage(@RequestParam("groupId") long groupId,@RequestParam("message") String message,Principal principal) {
		return groupChatService.sendGroupMessage(groupId,message,principal.getName());
	}
	@GetMapping("groupMessages")
	public List<GroupChatModel> groupMessages(@RequestParam("groupId") long groupId){
		return groupChatService.groupMessages(groupId);
	}
	
	@GetMapping("groupName")
	public GroupModel groupName(@RequestParam("groupId") long groupId) {
		return groupChatService.groupName(groupId);
	}
	@Value("${groupChatFilesPath}")
	String groupChatFilesPath;
	@RequestMapping(value = "uploadGroupChatFiles", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public String  uploadGroupChatFiles (
			@RequestParam(name="files") MultipartFile multipartFile,
			@RequestParam long groupId,
			Principal principal
			)
	{
		try {
			File uploadedFile = new File(groupChatFilesPath, multipartFile.getOriginalFilename());
			uploadedFile.createNewFile();
			FileOutputStream fos = new FileOutputStream(uploadedFile);
			fos.write(multipartFile.getBytes());
			fos.close();
			GroupChatModel groupChatModel = new GroupChatModel();
			groupChatModel.setFiles(multipartFile.getOriginalFilename());
			groupChatModel.setDate(new Date());
			return groupChatService.uploadChatFiles(groupChatModel,groupId,principal.getName());
		} catch (Exception e) {
			System.out.println(e);
			return "Fail to upload";
		}
	}

}
  
