package tasktracker.models;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name="projectGroup")
public class GroupModel {
	@Id
	@GeneratedValue
	private long groupId;
	private String groupName;
	private Date createdDate;
	private String description;
	private String groupPicture;
	@Transient
	private String groupPicture2;
	@Transient
	private int groupMembers;
	@Transient
	private long userId;
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.ALL.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="userId")
	private UserModel userModel;
	public long getGroupId() {
		return groupId;
	}
	public void setGroupId(long groupId) {
		this.groupId = groupId;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	public UserModel getUserModel() {
		return userModel;
	}
	public void setUserModel(UserModel userModel) {
		this.userModel = userModel;
	}
	public int getGroupMembers() {
		return groupMembers;
	}
	public void setGroupMembers(int groupMembers) {
		this.groupMembers = groupMembers;
	}
	public String getGroupPicture() {
		return groupPicture;
	}
	public void setGroupPicture(String groupPicture) {
		this.groupPicture = groupPicture;
	}
	public String getGroupPicture2() {
		return groupPicture2;
	}
	public void setGroupPicture2(String groupPicture2) {
		this.groupPicture2 = groupPicture2;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	
	
	
	
	

}
