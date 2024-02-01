import Cookies from "js-cookie";
import Head from "./head";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
const rest = require('../../EndPoints')

function ViewGroupMembers(){
    const[groupMembers,setGroupMembers] = useState([])
    let search = window.location.search;
    let params = new URLSearchParams(search);
    const navigate = useNavigate("")
    let groupId = params.get('groupId');
    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }
    useEffect(()=>{
        axios.get(rest.endPointViewGroupMembers+"?groupId="+groupId,header)
        .then(response => {
            console.log(response.data);
            setGroupMembers(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[])
    const Tasks = e =>{
        e.preventDefault();
        let groupMemberId = e.target[0].value;
        let userId = e.target[1].value;
        navigate("/tasks?groupMemberId="+groupMemberId+"&userId="+userId+"&groupId="+groupId)
    }
    const Chats = e =>{
        e.preventDefault();
        let userId = e.target[1].value;
        navigate("/chatNow?userId="+userId)
    }
    return(
        <>
        <Head/>
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-10">
                <div className="row">
                    {groupMembers.map((groupMember,index)=>
              <div className="col-md-4">
                <div className="card p-3">
                    <div className="text-center">
                    <img src={'data:image/jpeg;base64,'+groupMember['userModel']['picture2']}  style={{height:"120px",maxWidth:"40%"}}></img>
                    </div>
                    <div className="h6 text-secondary mt-3">Name : <b className="text-center">{groupMember['userModel']['name']}</b></div>
                    <div className="h6 text-secondary">Phone : <b>{groupMember['userModel']['phone']}</b></div>
                    <div className="h6 text-secondary ">Email : <b>{groupMember['userModel']['email']}</b></div>
                    <div className="row">
                        <div className="col-md-4">
                            <form onSubmit={Tasks}>
                                <input type="hidden" id="groupMemberId" value={groupMember['groupMemberId']} ></input>
                                <input type="hidden" id="userId" value={groupMember['userModel']['userId']} ></input>
                                <input type="submit" value={"Tasks"} className="bg-primary    nav-link text-white p-2" style={{fontSize:"13px"}}></input>
                           </form>
                        </div>
                        <div className="col-md-4">
                        <form onSubmit={Chats}>
                                <input type="hidden" id="groupMemberId" value={groupMember['groupMemberId']} ></input>
                                <input type="hidden" id="userId" value={groupMember['userModel']['userId']} ></input>
                                <input type="submit" value={"Chat"} className="bg-success   nav-link text-white p-2" style={{fontSize:"13px"}}></input>
                           </form>
                        </div>
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
export default ViewGroupMembers;