package tasktracker.services;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
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
public class GroupService {
	@Autowired
	private GroupRepository groupRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private GroupMemberRepository groupMemberRepository;
	@Value("${groupPath}")
	String groupPath;

	public String createGroup(GroupModel groupModel,String email) {
		UserModel userModel = userRepository.findByEmail(email);
		groupModel.setUserModel(userModel);
		groupModel.setCreatedDate(new Date());
		GroupModel groupModel2 = groupRepository.save(groupModel);
		GroupMemberModel groupMemberModel = new GroupMemberModel();
		groupMemberModel.setGroupModel(groupModel2);
		groupMemberModel.setUserModel(userModel);
		groupMemberModel.setStatus("Joined");
		groupMemberRepository.save(groupMemberModel);
		return "Group Created Successfully";
	}

	public List<GroupModel> viewGroups(String name) {
		UserModel userModel = userRepository.findByEmail(name);
		List<GroupMemberModel> groupMemberModelList = groupMemberRepository.findByUserModelAndStatus(userModel,"Joined");
		Iterator<GroupMemberModel> iterator = groupMemberModelList.iterator();
		List<GroupModel> groupModelList = new ArrayList<GroupModel>();
		while(iterator.hasNext()) {
			GroupMemberModel groupMemberModel = iterator.next();
			GroupModel groupModel = groupMemberModel.getGroupModel();
			try {
				 File file=new File(groupPath+"/"+groupModel.getGroupPicture());
				 InputStream in = new FileInputStream(file);
				 groupModel.setGroupPicture2(Base64.getEncoder().encodeToString(IOUtils.toByteArray(in)));
				 
				 } catch (Exception e) {
			 }
			groupModelList.add(groupModel);
			
			
		}
		return groupModelList;
	}

	public String sendGroupInvitation(long userId, long groupId) {
		
		return null;
	}

}
