package tasktracker.controllers;

import java.io.File;
import java.io.FileOutputStream;
import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import tasktracker.models.UserModel;
import tasktracker.repositories.UserRepository;
import tasktracker.services.UserService;

@RestController
public class UserController {
	@Value("${userPath}")
	String userPath;
	@Autowired
	private UserService userService;
	@Autowired
	private UserRepository userRepository;
	
	@GetMapping("verifyEmail")
	public String verifyEmail(@RequestParam("email") String email) {
		System.out.println(email);
		return userService.verifyEmail(email);
	}
	

	@RequestMapping(value = "userRegistration", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public String addProduct (
			@RequestParam(name="picture") MultipartFile multipartFile,
			@RequestParam String name,
			@RequestParam String email,
			@RequestParam String phone,
			@RequestParam String  password,
			@RequestParam String otp,
			@RequestParam String otp2
			)
	{
		try {
			File uploadedFile = new File(userPath, multipartFile.getOriginalFilename());
			uploadedFile.createNewFile();
			FileOutputStream fos = new FileOutputStream(uploadedFile);
			fos.write(multipartFile.getBytes());
			fos.close();
			UserModel userModel = new UserModel();
			userModel.setEmail(email);
			userModel.setPassword(password);
			userModel.setName(name);
			userModel.setPhone(phone);
			System.out.println(userPath);
			userModel.setPicture(multipartFile.getOriginalFilename());
			return userService.userRegistration(userModel,otp,otp2);
		} catch (Exception e) {
			System.out.println(e);
			return "Fail to upload";
		}
	}
	@GetMapping("userProfile")
	public UserModel userProfile(Principal principal) {
		return userService.userProfile(principal.getName());
	}
	@GetMapping("getUserProfile")
	public UserModel getUserProfile(@RequestParam("userId") long userId) {
		return userService.getUserProfile(userId);
	}
	
	
	@RequestMapping(value = "updateUserProfile", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public String updateUserProfile (
			@RequestParam String name,
			@RequestParam String email,
			@RequestParam String phone,
			@RequestParam String  password,
			@RequestParam long userId
			)
	{
		try {
			UserModel userModel = userRepository.findById(userId).get();
			userModel.setEmail(email);
			userModel.setPassword(password);
			userModel.setName(name);
			userModel.setPhone(phone);
			System.out.println(userPath);
			return userService.updateUserProfile(userModel);
		} catch (Exception e) {
			System.out.println(e);
			return "Fail to upload";
		}
	}
	@GetMapping("updateUserProfile")
	public String updateUserProfile(@RequestParam("userId") long userId,@RequestParam("password") String password,@RequestParam("phone") String phone,@RequestParam("email") String email,@RequestParam("name") String name){
    return userService.updateUserProfile(userId,name,password,phone,email);
	}
	
	@GetMapping("searchUsers")
	public List<UserModel> searchUsers(@RequestParam("searchKeyword") String searchKeyword,Principal principal,@RequestParam("groupId") long groupId){ 
		return userService.searchUsers(searchKeyword,principal.getName(),groupId);
	}
	@RequestMapping(value = "editUserPicture", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public String editUserPicture (
			@RequestParam(name="picture") MultipartFile multipartFile,
			@RequestParam long userId
			)
	{
		try {
			File uploadedFile = new File(userPath, multipartFile.getOriginalFilename());
			uploadedFile.createNewFile();
			FileOutputStream fos = new FileOutputStream(uploadedFile);
			fos.write(multipartFile.getBytes());
			fos.close();
			UserModel userModel = userRepository.findById(userId).get();
			userModel.setPicture(multipartFile.getOriginalFilename());
			return userService.editUserPicture(userModel);
		} catch (Exception e) {
			System.out.println(e);
			return "Fail to upload";
		}
	}

}
