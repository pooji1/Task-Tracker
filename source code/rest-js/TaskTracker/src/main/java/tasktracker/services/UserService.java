package tasktracker.services;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import jakarta.transaction.Transactional;
import tasktracker.email.EmailSending;
import tasktracker.models.CredentialsModel;
import tasktracker.models.GroupMemberModel;
import tasktracker.models.GroupModel;
import tasktracker.models.UserModel;
import tasktracker.repositories.GroupMemberRepository;
import tasktracker.repositories.GroupRepository;
import tasktracker.repositories.LoginRepository;
import tasktracker.repositories.UserRepository;

@Transactional
@Service
public class UserService {
	@Value("${userPath}")
	String userPath;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private  LoginRepository loginRepository;
	@Autowired
	private GroupRepository groupRepository;
	@Autowired
	private GroupMemberRepository groupMemberRepository;

	public String verifyEmail(String email) {
		UserModel userModel = userRepository.findByEmail(email);
		if(userModel == null) {
			String otp= new DecimalFormat("000000").format(new Random().nextInt(999999));
			EmailSending.send_message(email,"OTP For Account Creation","Use This Otp "+otp +" To Register Your Account");
	        System.out.println(otp);
			return otp;
		}
		else{
			return "Email Exists"; 
		}
	}

	public String userRegistration(UserModel userModel, String otp, String otp2) {
		if(otp2.equalsIgnoreCase(otp)) {
			List<UserModel> userModelList = userRepository.findByPhone(userModel.getPhone());
			if(userModelList.size()>0) {
				return "Duplicate Phone Number";
			}else {
				CredentialsModel credentialsModel = new CredentialsModel();
				credentialsModel.setUsername(userModel.getEmail());
				credentialsModel.setPassword(new BCryptPasswordEncoder().encode(userModel.getPassword()));
				credentialsModel.setRole("ROLE_USER");
				loginRepository.save(credentialsModel);
				CredentialsModel credentialsModel3 = loginRepository.findByUsername(userModel.getEmail());
				userModel.setCredentialsModel(credentialsModel3);
				userRepository.save(userModel);
				return "Account Registered Successfully";
			}
		}
		return "Invalid Otp";
		
	}

	public UserModel userProfile(String name) {
		UserModel userModel = userRepository.findByEmail(name);
		try {
			 File file=new File(userPath+"/"+userModel.getPicture());
			 InputStream in = new FileInputStream(file);
			 userModel.setPicture2(Base64.getEncoder().encodeToString(IOUtils.toByteArray(in)));
			 
			 } catch (Exception e) {
		 }
		return userModel;
	}

	public UserModel getUserProfile(long userId) {
		UserModel userModel = userRepository.findById(userId).get();
		try {
			 File file=new File(userPath+"/"+userModel.getPicture());
			 InputStream in = new FileInputStream(file);
			 userModel.setPicture2(Base64.getEncoder().encodeToString(IOUtils.toByteArray(in)));
			 
			 } catch (Exception e) {
		 }
		return userModel;
	}

	public String updateUserProfile(UserModel userModel) {
		userRepository.save(userModel);
		return "Details Updated";
	}

	public String updateUserProfile(long userId, String name, String password, String phone, String email) {
		UserModel userModel = userRepository.findById(userId).get();
		userModel.setEmail(email);
		userModel.setName(name);
		userModel.setPhone(phone);
		userModel.setPassword(password);
		userRepository.save(userModel);
		return "Details Updated";
	}

	public List<UserModel> searchUsers(String searchKeyword,String email,Long groupId) {
		GroupModel groupModel = groupRepository.findById(groupId).get();
		List<Long> userModelsList3 = new ArrayList<Long>();
		UserModel userModel2 = userRepository.findByEmail(email);
		userModelsList3.add(userModel2.getUserId());
		List<UserModel> userModelsList = new ArrayList<UserModel>();
		List<UserModel> userModelsList2 = new ArrayList<UserModel>();
		if(!searchKeyword.equalsIgnoreCase("")) {
			userModelsList = userRepository.getUserDetails(userModel2.getUserId(),searchKeyword);
			Iterator<UserModel> iterator = userModelsList.iterator();
			while(iterator.hasNext()) {
				UserModel userModel = iterator.next();
				try {
					 File file=new File(userPath+"/"+userModel.getPicture());
					 InputStream in = new FileInputStream(file);
					 userModel.setPicture2(Base64.getEncoder().encodeToString(IOUtils.toByteArray(in)));
					 } catch (Exception e) {
				 }
				List<GroupMemberModel> groupMemberModelsList = groupMemberRepository.findByUserModelAndGroupModel(userModel,groupModel);
				if(groupMemberModelsList.size()>0) {
					userModel.setInvited(true);
				}else {
					userModel.setInvited(false);
				}
				userModelsList2.add(userModel);
				
				
			}
		}
		return userModelsList2;
	}

	public String editUserPicture(UserModel userModel) {
		userRepository.saveAndFlush(userModel);
		return "Profile Changed Successfully";
	}

}
