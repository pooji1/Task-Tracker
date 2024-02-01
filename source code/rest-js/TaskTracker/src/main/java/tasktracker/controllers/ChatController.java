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
import tasktracker.models.TaskModel;
import tasktracker.models.UserModel;
import tasktracker.services.ChatService;

@RestController
public class ChatController {
	@Autowired
	private ChatService chatService;
	
	@GetMapping("sendMessage")
	public String sendMessage(@RequestParam("userId") long userId,@RequestParam("message") String message,Principal principal) {
		return chatService.sendMessage(userId,message,principal.getName());
	}
	
	@GetMapping("chatMessages")
	public List<ChatModel> chatMessages(@RequestParam("userId") long userId,Principal principal) {
		return chatService.chatMessages(userId,principal.getName());
	}
	@GetMapping("chatToUser")
	public UserModel chatToUser(@RequestParam("userId") long userId) {
		return chatService.chatToUser(userId);
	}
	@GetMapping("chatFromUser")
	public UserModel chatFromUser(Principal principal) {
		return chatService.chatFromUser(principal.getName());
	}
	@Value("${chatFilesPath}")
	String chatFilesPath;
	@RequestMapping(value = "uploadChatFiles", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public String  assignTask (
			@RequestParam(name="files") MultipartFile multipartFile,
			@RequestParam long userId,
			Principal principal
			)
	{
		try {
			File uploadedFile = new File(chatFilesPath, multipartFile.getOriginalFilename());
			uploadedFile.createNewFile();
			FileOutputStream fos = new FileOutputStream(uploadedFile);
			fos.write(multipartFile.getBytes());
			fos.close();
			ChatModel chatModel = new ChatModel();
			chatModel.setFiles(multipartFile.getOriginalFilename());
			chatModel.setDate(new Date());
			return chatService.uploadChatFiles(chatModel,userId,principal.getName());
		} catch (Exception e) {
			System.out.println(e);
			return "Fail to upload";
		}
	}
	

}
