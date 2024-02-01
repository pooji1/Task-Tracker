import Cookies from "js-cookie";
import Head from "./head";
import { useEffect, useState } from "react";
import axios from "axios";
const rest = require('../../EndPoints')

function GroupInvites(){
    const[groupMembers,setGroupMembers] = useState([])
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let groupId = params.get('groupId');
    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }

    useEffect(()=>{
        axios.get(rest.endPointInvitedGroupMembers+"?groupId="+groupId,header)
        .then(response => {
            console.log(response.data);
            setGroupMembers(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[])
    return(
        <>
        <Head/>
        {groupMembers.length==0?<><div className="text-center mt-5 h3">No Pending Invitations</div></>:<>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-10">
                        <div className="text-center h6">Invited Members</div>
                        <table className="table table-bordered p-2 mt-5" >
                            <tr style={{border:"1px solid black"}}>
                                <th style={{border:"1px solid black",textAlign:"center"}}>Invitation Id</th>
                                <th style={{border:"1px solid black",textAlign:"center"}}>Group Name</th>
                                <th style={{border:"1px solid black",textAlign:"center"}}>User</th>
                                <th style={{border:"1px solid black",textAlign:"center"}}>Invite Status</th>
                            </tr>
                            {groupMembers.map((groupMember,index)=>
                            <tr style={{border:"1px solid black"}}>
                            <td style={{textAlign:"center"}}>{index+1}</td>
                            <td style={{border:"1px solid black",textAlign:"center"}}>{groupMember['groupModel']['groupName']}</td>
                            <td style={{border:"1px solid black",textAlign:"center"}}>{groupMember['userModel']['name']}</td>
                            <td style={{border:"1px solid black",textAlign:"center"}}>{groupMember['status']}</td>
                            
                            </tr>
                            )}
                        </table>
                </div>
            </div>
        </div>
        
        
        </>}
        
      </>
)
}
export default GroupInvites;