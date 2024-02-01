import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Head from "./head";
import { useNavigate } from "react-router";
const rest = require('../../EndPoints')

function SendGroupInvitation(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let groupId = params.get('groupId');
    const navigate = useNavigate("")

    let[searchKeyword,setKeywords] = useState("")
    const[users,setUser] = useState([])
    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }
    
    useEffect(()=>{
        axios.get(rest.endPointSearchUers+"?searchKeyword="+searchKeyword+"&groupId="+groupId,header)
        .then(response => {
            console.log(response.data);
            setUser(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[searchKeyword])

     const SendGroupInvitation1 = (userId)=>{
        console.log(userId);
        axios.get(rest.endPointSendGroupInvitation+"?userId="+userId+"&groupId="+groupId,header)
        .then(response => {
            console.log(response.data);
            alert(response.data)
            navigate("/viewGroups")
            
        })
        .catch(err => {
            console.log(err)
        })
     }
    return(
        <>
        <Head/>
        <div className='container-fluid mt-4'>
                <div className='row'>
                    <div className="col-md-4"></div>
                    <div className='col-md-4'>
                        <input type="text" id='searchKeyword' onChange={e=>setKeywords(e.target.value)} className='form-control mt-1' placeholder='Search Users'></input>
                    </div>
                    
                </div>
            </div>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-10">
                <div className="row">
                {users.map((user,index)=>
              <div className="col-md-4">
                <div className="card p-3">
                    <div className="text-center">
                    <img src={'data:image/jpeg;base64,'+user['picture2']}  style={{height:"120px",maxWidth:"40%",borderRadius:"50%"}}></img>
                    </div>
                    
                    <div className="h6 text-secondary mt-3">Name : <b className="text-center">{user['name']}</b></div>
                    <div className="h6 text-secondary">Phone : <b>{user['phone']}</b></div>
                    <div className="h6 text-secondary ">Email : <b>{user['email']}</b></div>
                    {user['invited']?<>
                        <div className="text-center text-warning">Already Invited</div>
                    </>:<>
                       <button onClick={()=>{SendGroupInvitation1(user['userId'])}} className="bg-primary text-white nav-link">Send</button>
                    </>}
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
export default SendGroupInvitation;