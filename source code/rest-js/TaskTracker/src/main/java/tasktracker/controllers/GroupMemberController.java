package tasktracker.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import tasktracker.models.GroupMemberModel;
import tasktracker.services.GroupMemberService;

@RestController
public class GroupMemberController {
	@Autowired
	private GroupMemberService groupMemberService;
	
	@GetMapping("sendGroupInvitation")
	public String sendGroupInvitation(@RequestParam("userId") long userId,@RequestParam("groupId") long groupId) {
		return groupMemberService.sendGroupInvitation(userId,groupId);
	}
    
	@GetMapping("viewGroupMembers")
	public List<GroupMemberModel> viewGroupMembers(@RequestParam("groupId") long groupId,Principal principal)
	{
		return groupMemberService.viewGroupMembers(groupId,principal.getName());
	}
	
	@GetMapping("invitedGroupMembers")
	public List<GroupMemberModel> invitedGroupMembers(@RequestParam("groupId") long groupId){
		return groupMemberService.invitedGroupMembers(groupId);
	}
	@GetMapping("myGroupInvitations")
	public List<GroupMemberModel> myGroupInvitations(Principal principal){
		return groupMemberService.myGroupInvitations(principal.getName());
	}
	
	@GetMapping("acceptGroupInvitations")
	public String acceptGroupInvitations(@RequestParam("groupMemberId") long groupMemberId) {
		return groupMemberService.acceptGroupInvitations(groupMemberId);
	}
	@GetMapping("groupMembers")
	public List<GroupMemberModel> groupMembers(@RequestParam("groupId") long groupId,Principal principal){
		return groupMemberService.groupMembers(groupId,principal.getName());
	}
}
