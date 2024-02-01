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
@Table(name="task")
public class TaskModel {
	@Id
	@GeneratedValue
	private long taskId;
	private String taskTitle;
	private Date startDate;
	private Date endDate;
	private Date AssignedDate;
	private String description;
	private int priority;
	private int percentageOfCompletion;
	private String status;
	@Lob
	private String docs;
	@Transient
	private String docs2;
	@Transient
	private boolean isCreater;
	
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.ALL.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="assignedTo")
	private UserModel userModel;
	public boolean isCreater() {
		return isCreater;
	}
	public void setCreater(boolean isCreater) {
		this.isCreater = isCreater;
	}
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.ALL.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="assignedBy")
	private UserModel userModel2;
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.ALL.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="groupMemberId")
	private GroupMemberModel groupMemberModel;
	public long getTaskId() {
		return taskId;
	}
	public void setTaskId(long taskId) {
		this.taskId = taskId;
	}
	public String getTaskTitle() {
		return taskTitle;
	}
	public void setTaskTitle(String taskTitle) {
		this.taskTitle = taskTitle;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getPriority() {
		return priority;
	}
	public void setPriority(int priority) {
		this.priority = priority;
	}
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public UserModel getUserModel() {
		return userModel;
	}
	public void setUserModel(UserModel userModel) {
		this.userModel = userModel;
	}
	public UserModel getUserModel2() {
		return userModel2;
	}
	public void setUserModel2(UserModel userModel2) {
		this.userModel2 = userModel2;
	}
	public GroupMemberModel getGroupMemberModel() {
		return groupMemberModel;
	}
	public void setGroupMemberModel(GroupMemberModel groupMemberModel) {
		this.groupMemberModel = groupMemberModel;
	}
	public String getDocs() {
		return docs;
	}
	public void setDocs(String docs) {
		this.docs = docs;
	}
	public Date getAssignedDate() {
		return AssignedDate;
	}
	public void setAssignedDate(Date assignedDate) {
		AssignedDate = assignedDate;
	}
	public int getPercentageOfCompletion() {
		return percentageOfCompletion;
	}
	public void setPercentageOfCompletion(int percentageOfCompletion) {
		this.percentageOfCompletion = percentageOfCompletion;
	}
	public String getDocs2() {
		return docs2;
	}
	public void setDocs2(String docs2) {
		this.docs2 = docs2;
	}
	
	
	

}
