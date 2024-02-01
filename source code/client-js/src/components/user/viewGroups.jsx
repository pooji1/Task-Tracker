import { useEffect, useState } from "react"
import Head from "./head"
import Cookies from "js-cookie"
import axios from "axios"
import React from "react"
import { useNavigate } from "react-router"
const rest = require('../../EndPoints')

function ViewGroups(){
    const navigate = useNavigate();
    const[groupName,setGroupName] = useState("")
    const[groups,setGroups] = useState([])
    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }

    useEffect(()=>{
        axios.get(rest.endPointViewGroup,header)
        .then(response => {
            console.log(response.data);
            setGroups(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[])
    const CreateGroup = ()=>{
        navigate("/createGroup")
    }


    const SendGroupInvitation = e =>{
        e.preventDefault()
        let groupId = e.target[0].value;
        console.log(groupId);
        navigate("/sendGroupInvitation?groupId="+groupId)
    }
     
    const ViewGroupMembers = e =>{
        e.preventDefault();
        let groupId = e.target[0].value;
        navigate("/viewGroupMembers?groupId="+groupId)
    }
    const GroupInvites = e =>{
        e.preventDefault();
        let groupId = e.target[0].value;
        navigate("/groupInvites?groupId="+groupId)
    }
    const CreateTask = (e) =>{
        e.preventDefault()
        let groupId = e.target[0].value;
        navigate("/createTask?userId="+0+"&groupMemberId="+0+"&groupId="+groupId)
    }
    const GroupChatAction = e =>{
        e.preventDefault();
        let groupId = e.target[0].value;
        let userId = e.target[1].value;
        navigate("/groupChat?userId="+userId+"&groupId="+groupId)


    }

    const GroupTasks = e=>{
        e.preventDefault();
        let groupId = e.target[0].value;
        let userId = e.target[1].value;
        navigate("/groupTasks?userId="+userId+"&groupId="+groupId)
    }
    return(
        <>
        <Head/>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-2">
                <button onClick={()=>CreateGroup()} className="btn">Create Group</button>
                </div>
            </div>
        </div>
         <div className="continer-fluid" >
            <div className="row">
             <div className="col-md-2"></div>
             <div className="col-md-10" style={{marginLeft:"270px"}} >
                <div className="row" >
                  {groups.map((group,index)=>
                  <div className="card p-3 mt-1" >
                    <div className="row">
                    <div className="col-md-2">
                    <img src={'data:image/jpeg;base64,' + group['groupPicture2']} style={{ height: "120px", maxWidth: "60%"}}></img>
                    <div className="text-muted " style={{fontSize:"12px"}}>Description</div>
                    <div className="h6" style={{overflow:"auto",height:"20px",fontSize:"15px"}}>{group['description']}</div>
                    </div>
                    <div className="col-md-4">
                        <div className="text-muted" style={{fontSize:"12px"}}>Group Name</div>
                        <div className="h6">{group['groupName']}</div>
                    </div>
                    <div className="col-md-3">
                        <div className="text-muted" style={{fontSize:"12px"}}>Created By </div>
                        <div className="">{group['userModel']['name']}</div>
                     </div>
                    <div className="col-md-3">
                         <div className="text-muted" style={{fontSize:"12px"}}>Created On </div>
                         <div>{group['createdDate'].split(".")[0].replace("T", " ").substring(0, 16)}</div>
                      </div>
                    <div className="col-md-2">
                        <form onSubmit={CreateTask}>
                            <input type="hidden" id="groupId" value={group['groupId']} ></input>
                            <input type="hidden" id="userId" value={group['userModel']['userId']} ></input>
                            <input type="submit" value={"Create Task"} className="bg-primary    nav-link text-white p-2" style={{fontSize:"13px"}}></input>
                        </form>
                    </div>
                    <div className="col-md-2">
                        <form onSubmit={GroupTasks}>
                            <input type="hidden" id="groupId" value={group['groupId']} ></input>
                            <input type="hidden" id="userId" value={group['userModel']['userId']} ></input>
                            <input type="submit" value={"Tasks"} className="bg-primary    nav-link text-white p-2" style={{fontSize:"13px"}}></input>
                        </form>
                    </div>
                    <div className="col-md-2">
                            <form onSubmit={GroupChatAction}>
                                <input type="hidden" id="groupId" value={group['groupId']} ></input>
                                <input type="hidden" id="userId" value={group['userModel']['userId']} ></input>
                                <input type="submit" value={"Chat"} className="bg-primary    nav-link text-white p-2" style={{fontSize:"13px"}}></input>
                           </form>
                    </div>
                    <div className="col-md-2">
                        <form onSubmit={ViewGroupMembers}>
                            <input type="hidden" id="groupId" value={group['groupId']} ></input>
                            <input type="submit" value={"Group Members"} className="bg-primary nav-link text-white p-2" style={{fontSize:"13px"}}></input>
                        </form>
                    </div>
                    <div className="col-md-2">
                        <form onSubmit={GroupInvites}>
                            <input type="hidden" id="groupId" value={group['groupId']} ></input>
                            <input type="submit" value={"Group Invites"} className="bg-primary  nav-link text-white p-2" style={{fontSize:"13px"}}></input>
                        </form>
                    </div>
                    <div className="col-md-2">
                        <form  onSubmit={SendGroupInvitation}>
                            <input type="hidden" id="groupId" value={group['groupId']}></input>
                            <input type="submit" style={{fontSize:"13px"}} className="bg-primary nav-link p-2 text-white" value={"Send Group Invitation"}></input>
                        </form>
                    </div>

                    </div>
                    
                  </div>
                  )}
                </div>
             </div>
            </div>
         </div>
        </>
    )
}
export default ViewGroups