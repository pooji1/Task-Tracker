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
import tasktracker.models.ChatModel;
import tasktracker.models.GroupChatModel;
import tasktracker.models.GroupModel;
import tasktracker.models.UserModel;
import tasktracker.repositories.GroupChatRepository;
import tasktracker.repositories.GroupRepository;
import tasktracker.repositories.UserRepository;

@Service
@Transactional
public class GroupChatService {
	@Autowired
	private GroupChatRepository groupChatRepository;
	@Autowired
	private GroupRepository groupRepository;
	@Autowired
	private UserRepository userRepository;
	@Value("${groupChatFilesPath}")
	String groupChatFilesPath;

	public String sendGroupMessage(long groupId, String message,String email) {
		UserModel userModel = userRepository.findByEmail(email);
		GroupModel groupModel = groupRepository.findById(groupId).get();
		GroupChatModel groupChatModel = new GroupChatModel();
		groupChatModel.setDate(new Date());
		groupChatModel.setMessage(message);
		groupChatModel.setGroupModel(groupModel);
		groupChatModel.setUserModel(userModel);
		groupChatRepository.save(groupChatModel);
		return "Message Sent";
	}

	public List<GroupChatModel> groupMessages(long groupId) {
		GroupModel groupModel = groupRepository.findById(groupId).get();
		List<GroupChatModel> groupChatModelsList = groupChatRepository.findByGroupModel(groupModel);
		Iterator<GroupChatModel> iterator = groupChatModelsList.iterator();
		List<GroupChatModel> groupChatModelsList2 = new ArrayList<GroupChatModel>();
		while(iterator.hasNext()) {
			GroupChatModel groupChatModel = iterator.next();
			try {
				 File file=new File(groupChatFilesPath+"/"+groupChatModel.getFiles());
				 InputStream in = new FileInputStream(file);
				 groupChatModel.setFiles2(Base64.getEncoder().encodeToString(IOUtils.toByteArray(in)));
				 
				 } catch (Exception e) {
			 }
			groupChatModelsList2.add(groupChatModel);
			
		}
		return groupChatModelsList;
	}

	public GroupModel groupName(long groupId) {
		GroupModel groupModel = groupRepository.findById(groupId).get();
		return groupModel;
	}

	public String uploadChatFiles(GroupChatModel groupChatModel, long groupId, String name) {
		GroupModel groupModel = groupRepository.findById(groupId).get();
		UserModel userModel = userRepository.findByEmail(name);
		groupChatModel.setUserModel(userModel);
		groupChatModel.setGroupModel(groupModel);
		groupChatRepository.save(groupChatModel);
		return "Message Sent";
	}
	

}
