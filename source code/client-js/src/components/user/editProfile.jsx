import { useNavigate } from "react-router-dom";
import Head from "./head";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
const rest = require('../../EndPoints')

function EditProfile(){
    const [state, setState] = useState([])
    const navigate = useNavigate();
    const[user,setUser] = useState([])
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let userId = params.get('userId');
    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }
    useEffect(() => {
        axios.get(rest.endPointGetUserProfile+"?userId="+userId, header)
            .then(function (response) {
                console.log(response.data);
                setUser(response.data)
                document.getElementById("name").value=response.data['name']
                document.getElementById("email").value=response.data['email']
                document.getElementById("phone").value=response.data['phone']
                document.getElementById("password").value=response.data['password']
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    const EditProfile1 = e =>{
        e.preventDefault();
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("phone").value;
        let password = document.getElementById("password").value;
        let data = {
            "name":name,
            "email":email,
            "password":password,
            "phone":phone,
        }
        axios.get(rest.endPointUpdatUsereDetails+"?userId="+userId+"&name="+name+"&email="+email+"&password="+password+"&phone="+phone,header)
        .then(response => {
            alert(response.data);
            navigate("/userHome");
            
        })
        .catch(err => {
            console.log(err)
            alert("Something Went Wrong")
        })

    }
    return(
        <>
        <Head/>
        <div className="container-fluidt-4 ">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="card p-4 mt-5">
                        <div className="text-center h3">Update Details</div>
                        <form onSubmit={EditProfile1}>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" id="name"  className="form-control" placeholder="Enter Name"></input>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" id="email"  className="form-control" placeholder="Enter Email"></input>
                            </div>
                            <div className="form-group mt-2 ">
                                <label>Phone</label>
                                <input type="tel" id="phone"  className="form-control" placeholder="Enter Phone"></input>
                            </div>
                            <div className="form-group mt-2 ">
                                <label>Password</label>
                                <input type="password" id="password" className="form-control" placeholder="Enter Password"></input>
                            </div>
                           
                            <input type="submit" value={"Update"} className="btn"></input>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default EditProfile;