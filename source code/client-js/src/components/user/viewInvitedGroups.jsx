import Cookies from "js-cookie";
import Head from "./head";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const rest = require('../../EndPoints')
function ViewInvitedGroups() {
    const [groupMembers, setGroupMembers] = useState([])
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let groupId = params.get('groupId');
    const navigate  =  useNavigate("")
    const[count,setCount]  = useState(0)
    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }

    useEffect(() => {
        axios.get(rest.endPointMyInvitations, header)
            .then(response => {
                console.log(response.data);
                setGroupMembers(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [count])

    const AcceptGroupInvitation = e => {
        e.preventDefault();
        let groupMemberId = e.target[0].value;
        axios.get(rest.endPointAcceptInvitation + "?groupMemberId=" + groupMemberId, header)
            .then(response => {
                console.log(response.data);
                alert(response.data)
                setCount(count+1)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const Tasks = e =>{
        e.preventDefault();
        let groupMemberId = e.target[0].value;
        let userId = e.target[1].value;
        let groupId = e.target[2].value;
        navigate("/tasks?groupMemberId="+groupMemberId+"&userId="+userId+"&groupId="+groupId)

    }
    return (
        <>
            <Head />
            {groupMembers.length==0?<><div className="text-center mt-5 h3">No Pending Invitations</div></>:<>
            <div className="continer-fluid">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-10" style={{ marginLeft: "270px" }} >
                        <div className="text-center h3">Invited Groups</div>
                        <div className="row">
                            {groupMembers.map((groupMember, index) =>
                                <div className="card p-3 mt-1">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <img src={'data:image/jpeg;base64,' + groupMember['groupModel']['groupPicture2']} style={{ height: "120px", maxWidth: "60%", borderRadius: "50%" }}></img>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="text-muted" style={{ fontSize: "12px" }}>Group Name</div>
                                            <div className="h6">{groupMember['groupModel']['groupName']}</div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="text-muted" style={{ fontSize: "12px" }}>Invited By </div>
                                            <div className="">{groupMember['groupModel']['userModel']['name']}</div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="text-muted" style={{ fontSize: "12px" }}>Created On</div>
                                            <div>{groupMember['groupModel']['createdDate'].replace('T', ' ').replace('Z', '')}</div>
                                        </div>

                                        <div className="col-md-4 mt-1" style={{ marginLeft: "16px" }}>
                                            <div className="text-muted">Status</div>
                                            <div className="h6 ">{groupMember['status']}</div>
                                        </div>
                                        <div className="col-md-4 mt-1 text-end">
                                        {groupMember['status'] === 'Invited' ? <>
                                            <form onSubmit={AcceptGroupInvitation}>
                                                <input type="hidden" id="groupMemberId" value={groupMember['groupMemberId']}></input>
                                                <input type="submit" value={"Accept Invitation"} className="nav-link bg-primary p-2 text-white"></input>
                                            </form>
                                        </> : <>
                                        <div className="col-md-4">
                                            <form onSubmit={Tasks}>
                                                <input type="hidden" id="groupMemberId" value={groupMember['groupMemberId']} ></input>
                                                <input type="hidden" id="userId" value={groupMember['userModel']['userId']} ></input>
                                                <input type="hidden" id="userId" value={groupMember['groupModel']['groupId']} ></input>
                                                <input type="submit" value={"Tasks"} className="bg-primary w-50   nav-link text-white p-2" style={{fontSize:"13px"}}></input>
                                            </form>
                                        </div>
                                        </>}
                                        </div>
                                        

                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            </>}
            
        </>
    )
}
export default ViewInvitedGroups;