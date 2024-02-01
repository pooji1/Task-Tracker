package tasktracker.services;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import tasktracker.models.GroupMemberModel;
import tasktracker.models.GroupModel;
import tasktracker.models.UserModel;
import tasktracker.repositories.GroupMemberRepository;
import tasktracker.repositories.GroupRepository;
import tasktracker.repositories.UserRepository;

@Service
@Transactional
public class GroupMemberService {
	@Autowired
	private GroupMemberRepository groupMemberRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private GroupRepository groupRepository;
	@Value("${groupPath}")
	String groupPath;
	@Value("${userPath}")
	String userPath;
	

	public String sendGroupInvitation(long userId, long groupId) {
		UserModel userModel = userRepository.findById(userId).get();
		GroupModel groupModel = groupRepository.findById(groupId).get();
		GroupMemberModel groupMemberModel = new GroupMemberModel();
		groupMemberModel.setGroupModel(groupModel);
		groupMemberModel.setUserModel(userModel);
		groupMemberModel.setStatus("Invited");
		groupMemberRepository.save(groupMemberModel);
		return "Group Invitation Sent";
	}


	public List<GroupMemberModel> viewGroupMembers(long groupId, String name) {
		GroupModel groupModel = groupRepository.findById(groupId).get();
		List<GroupMemberModel> groupMemberModelsList = groupMemberRepository.findByGroupModelAndStatus(groupModel,"Joined");
		Iterator<GroupMemberModel> iterator = groupMemberModelsList.iterator();
		List<GroupMemberModel> groupMemberModelsList2 = new ArrayList<GroupMemberModel>();
		while(iterator.hasNext()) {
			GroupMemberModel groupMemberModel = iterator.next();
			UserModel userModel = groupMemberModel.getUserModel();
			try {
				 File file=new File(userPath+"/"+userModel.getPicture());
				 InputStream in = new FileInputStream(file);
				 userModel.setPicture2(Base64.getEncoder().encodeToString(IOUtils.toByteArray(in)));
				 
				
			} catch (Exception e) {
			 }
			groupMemberModelsList2.add(groupMemberModel);
			
		}
		return groupMemberModelsList;
	}

	
	public List<GroupMemberModel> invitedGroupMembers(long groupId) {
		GroupModel groupModel = groupRepository.findById(groupId).get();
		List<GroupMemberModel> groupMemberModelsList = groupMemberRepository.findByGroupModelAndStatus(groupModel,"Invited");
		return groupMemberModelsList;
	}


	public List<GroupMemberModel> myGroupInvitations(String name) {
		UserModel userModel = userRepository.findByEmail(name);
		List<GroupMemberModel> groupMemberModelsList = groupMemberRepository.findByUserModelAndStatus(userModel,"Invited");
		Iterator<GroupMemberModel> iterator= groupMemberModelsList.iterator();
		List<GroupMemberModel> groupMemberModelsList2 = new ArrayList<GroupMemberModel>();
		while(iterator.hasNext()) {
			GroupMemberModel groupMemberModel = iterator.next();
			GroupModel groupModel = groupMemberModel.getGroupModel();
			try {
				 File file=new File(groupPath+"/"+groupModel.getGroupPicture());
				 InputStream in = new FileInputStream(file);
				 groupModel.setGroupPicture2(Base64.getEncoder().encodeToString(IOUtils.toByteArray(in)));
				 
				
			} catch (Exception e) {
			 }
			groupMemberModelsList2.add(groupMemberModel);
			
		}
		return groupMemberModelsList;
	}


	public String acceptGroupInvitations(long groupMemberId) {
		GroupMemberModel groupMemberModel = groupMemberRepository.findById(groupMemberId).get();
		groupMemberModel.setStatus("Joined");
		groupMemberRepository.saveAndFlush(groupMemberModel);
		return "Invitation Accepted";
	}


	public List<GroupMemberModel> groupMembers(long groupId,String email) {
		List<Long> userModelsList = new ArrayList<Long>();
		UserModel userModel = userRepository.findByEmail(email);
		userModelsList.add(userModel.getUserId());
		GroupModel groupModel = groupRepository.findById(groupId).get();
		List<GroupMemberModel> groupMemberModelsList = groupMemberRepository.findByGroupModelAndUserModelNot(groupModel,userModel);
		System.out.println(groupMemberModelsList.size());
		return groupMemberModelsList;
	}

}
