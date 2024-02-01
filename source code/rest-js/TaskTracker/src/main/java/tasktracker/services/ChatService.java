package tasktracker.services;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import tasktracker.models.ChatModel;
import tasktracker.models.UserModel;
import tasktracker.repositories.ChatRepository;
import tasktracker.repositories.UserRepository;

@Service
@Transactional
public class ChatService {
	@Autowired
	private ChatRepository chatRepository;
	@Autowired
	private UserRepository userRepository;
	@Value("${chatFilesPath}")
	String chatFilesPath;
	

	public String sendMessage(long userId, String message,String email) {
		UserModel userModel = userRepository.findById(userId).get();
		UserModel userModel2 = userRepository.findByEmail(email);
		ChatModel chatModel = new ChatModel();
		chatModel.setDate(new Date());
		chatModel.setMessageTo(userModel);
		chatModel.setMessage(message);
		chatModel.setMesssageFrom(userModel2);
		chatRepository.save(chatModel);
		return "Message Sent";
	}


	public List<ChatModel> chatMessages(long userId, String name) {
		UserModel  userModel = userRepository.findByEmail(name);
		UserModel userModel2 = userRepository.findById(userId).get();
		List<ChatModel> chatModelsList = chatRepository.findByMesssageFromAndMessageToOrMesssageFromAndMessageTo(userModel,userModel2,userModel2,userModel);
		List<ChatModel> chatModelsList2 = new ArrayList<ChatModel>();
		Iterator<ChatModel> iterator = chatModelsList.iterator();
		while(iterator.hasNext()) {
			ChatModel chatModel = iterator.next();
			try {
				 File file=new File(chatFilesPath+"/"+chatModel.getFiles());
				 InputStream in = new FileInputStream(file);
				 chatModel.setFiles2(Base64.getEncoder().encodeToString(IOUtils.toByteArray(in)));
				 
				 } catch (Exception e) {
			 }
			chatModelsList2.add(chatModel);
			
			
		}
		return chatModelsList;
	}


	public UserModel chatToUser(long userId) {
		UserModel  userModel = userRepository.findById(userId).get();
		return userModel;
	}


	public UserModel chatFromUser(String name) {
		UserModel userModel = userRepository.findByEmail(name);
		return userModel;
	}


	public String uploadChatFiles(ChatModel chatModel, long userId, String name) {
		UserModel userModel = userRepository.findById(userId).get();
		UserModel userModel2 = userRepository.findByEmail(name);
		chatModel.setMessageTo(userModel);
		chatModel.setMesssageFrom(userModel2);
		chatRepository.save(chatModel);
		return "Sent";
	}
	
	
	
	

}
