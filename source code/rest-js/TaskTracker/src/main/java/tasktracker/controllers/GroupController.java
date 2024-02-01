package tasktracker.controllers;

import java.io.File;
import java.io.FileOutputStream;
import java.security.Principal;
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


import tasktracker.models.GroupModel;
import tasktracker.services.GroupService;

@RestController

public class GroupController {
	@Autowired
	private GroupService groupService;
	@Value("${groupPath}")
	String groupPath;
	@RequestMapping(value = "createGroup", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public String createGroup (
			@RequestParam(name="picture") MultipartFile multipartFile,
			@RequestParam String groupName,
			@RequestParam String description,
			Principal principal
			)
	{
		try {
			File uploadedFile = new File(groupPath, multipartFile.getOriginalFilename());
			uploadedFile.createNewFile();
			FileOutputStream fos = new FileOutputStream(uploadedFile);
			fos.write(multipartFile.getBytes());
			fos.close();
			GroupModel groupModel = new GroupModel();
			groupModel.setGroupName(groupName);
			groupModel.setDescription(description);
			groupModel.setGroupPicture(multipartFile.getOriginalFilename());
			return groupService.createGroup(groupModel,principal.getName());
		} catch (Exception e) {
			System.out.println(e);
			return "Fail to upload";
		}
	}
	
	@GetMapping("viewGroups")
	public List<GroupModel> viewGroups(Principal principal){
		return groupService.viewGroups(principal.getName());
	}
	
	
	

}
