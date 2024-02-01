import { Link, useNavigate } from "react-router-dom";
import './userHome.css'
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
const rest = require('../../EndPoints')

function Head(){
    const navigate = useNavigate("")
    const[user,setUser] = useState([])
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

    const EditProfileImage = (userId) =>{
        navigate("/editProfileImage?userId="+userId)
    }
    return(
        <>
        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <p class="sidebar">
            <div className="row">
                <div className="col-md-10"></div>
                <div className="col-md-2">
                <button className="nav-link " onClick={()=>EditProfileImage(user['userId'])}><i class="fa fa-edit"></i></button>
                </div>
            
            </div>
        
            <Link to={"/userHome"} className="h3 text-center " style={{border:"1px solid #cccccc"}}><img className="text-center" src={'data:image/jpeg;base64,'+user['picture2']} style={{height:"120px",maxWidth:"50%",borderRadius:"70%"}}></img><br></br>{user['name']}</Link>
            <Link className="text-center text-black" to={"/viewGroups"}><i class="fa fa-group" style={{fontSize:"36px"}}></i><br></br>My Groups</Link>
            <Link className="text-center text-black" to={"/viewInvitedGroups"}><i class="fa fa-group" style={{fontSize:"36px"}}></i><br></br>Invitations</Link>
            <Link className="text-center text-black" to={"/logout"}><i class="fa fa-sign-out" style={{fontSize:"36px"}}></i><br></br> Logout</Link>
        </p>
        <p class="content">
        </p>
        </>
    )
}
export default Head;