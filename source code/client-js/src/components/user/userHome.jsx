import  Cookies  from "js-cookie";
import Head from "./head";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const rest = require('../../EndPoints')
function UserHome(){
    const[user,setUser] = useState([])
    const navigate = useNavigate();
    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }
    useEffect(() => {
        axios.get(rest.endPointUserProfile, header)
            .then(function (response) {
                console.log(response.data);
                setUser(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    const EditProfile  = (userId) =>{
       navigate("/editProfile?userId="+userId)
    }
   
    return(
        <>
        <div className="uHome">
        <Head/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <div className="container-fluid mt-5">
            <div className="row">
              <div className="col-md-5"></div>
              <div className="col-md-3">
                <div className="card p-3">
                    <button className="nav-link text-end" style={{fontSize:"20px"}} onClick={()=>EditProfile(user['userId'])} ><i class="fa fa-edit"></i></button>
                    <div className="text-center">
                    <img src={'data:image/jpeg;base64,'+user['picture2']}  style={{height:"120px",maxWidth:"40%",borderRadius:"50%"}}></img>
                    </div>
                    <div className="h6 text-secondary mt-3">Name : <b className="text-center">{user['name']}</b></div>
                    <div className="h6 text-secondary">Phone : <b>{user['phone']}</b></div>
                    <div className="h6 text-secondary ">Email : <b>{user['email']}</b></div>
                </div>
              </div>
              <div className="col-md-4"></div>
            </div>
        </div>
        </div>
        
        </>
    )
}
export default UserHome;