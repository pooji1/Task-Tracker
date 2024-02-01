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
@Table(name="taskDiscussion")
public class TaskDiscussionModel {
	@Id
	@GeneratedValue
	private long taskDiscussionId;
	private String discussions;
	private Date date;
	private String bugComment;
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.ALL.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="taskId")
	private TaskModel taskModel;
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.ALL.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="messageBy")
	private UserModel userModel;
	public long getTaskDiscussionId() {
		return taskDiscussionId;
	}
	public void setTaskDiscussionId(long taskDiscussionId) {
		this.taskDiscussionId = taskDiscussionId;
	}
	public String getDiscussions() {
		return discussions;
	}
	public void setDiscussions(String discussions) {
		this.discussions = discussions;
	}
	public TaskModel getTaskModel() {
		return taskModel;
	}
	public void setTaskModel(TaskModel taskModel) {
		this.taskModel = taskModel;
	}
	public UserModel getUserModel() {
		return userModel;
	}
	public void setUserModel(UserModel userModel) {
		this.userModel = userModel;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getBugComment() {
		return bugComment;
	}
	public void setBugComment(String bugComment) {
		this.bugComment = bugComment;
	}
	
	

}
