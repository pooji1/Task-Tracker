package tasktracker.models;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name="groupChat")
public class GroupChatModel {
	@Id
	@GeneratedValue
	private long groupChatId;
	private String message;
	private Date date;
	@Lob
	private String files;
	@Transient 
	private String files2;
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.ALL.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="groupId")
	private GroupModel groupModel;
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.ALL.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="userId")
	private UserModel userModel;
	
	public long getGroupChatId() {
		return groupChatId;
	}
	public void setGroupChatId(long groupChatId) {
		this.groupChatId = groupChatId;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getFiles() {
		return files;
	}
	public void setFiles(String files) {
		this.files = files;
	}
	public String getFiles2() {
		return files2;
	}
	public void setFiles2(String files2) {
		this.files2 = files2;
	}
	public GroupModel getGroupModel() {
		return groupModel;
	}
	public void setGroupModel(GroupModel groupModel) {
		this.groupModel = groupModel;
	}
	public UserModel getUserModel() {
		return userModel;
	}
	public void setUserModel(UserModel userModel) {
		this.userModel = userModel;
	}
	

}
