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
@Table(name="chat")
public class ChatModel {
	@Id
	@GeneratedValue
	private long chatId;
	private String message;
	private Date date;
	@Lob
	private String files;
	@Transient 
	private String files2;
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.ALL.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="messsageFrom")
	private UserModel messsageFrom;
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.ALL.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name="messageTo")
	private UserModel  messageTo;
	public long getChatId() {
		return chatId;
	}
	public void setChatId(long chatId) {
		this.chatId = chatId;
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
	
	public UserModel getMessageTo() {
		return messageTo;
	}
	public void setMessageTo(UserModel messageTo) {
		this.messageTo = messageTo;
	}
	public UserModel getMesssageFrom() {
		return messsageFrom;
	}
	public void setMesssageFrom(UserModel messsageFrom) {
		this.messsageFrom = messsageFrom;
	}
	public String getFiles2() {
		return files2;
	}
	public void setFiles2(String files2) {
		this.files2 = files2;
	}
	
	
	

}
