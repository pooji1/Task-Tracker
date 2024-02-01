import { Link, useNavigate } from 'react-router-dom';
import './home.css';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
const rest = require('../../EndPoints')
function Home(){
     const[email,setEmail] = useState("")
     const[password,setPassword] = useState("")
     const navigate = useNavigate();
     let header = {
         headers: {
             "Content-type": "Application/json"
         }
     }
    const LoginAction = e =>{
        e.preventDefault();
        if(email.length===0){
            document.getElementById("email-msg").innerHTML="Enter Email"
            return
        }else{
            document.getElementById("email-msg").innerHTML=""
        }

        if(password.length==0){
            document.getElementById("password-msg").innerHTML="Enter Password"
            return
        }else{
            document.getElementById("email-msg").innerHTML=""
        }

        let data = {
            "username":email,
            "password":password
        }
        axios.post(rest.endPointUserLogin,data,header)
        .then(response => {
            console.log(response.data);
            if(response.data==='Invalid Login Details'){
                alert(response.data)
                return
            }
            else{
                Cookies.set("token",response.data)
                navigate("/userHome")
            }
            
            
        })
        .catch(err => {
            console.log(err)
            alert("Something Went Wrong")
        })

    }

    return(
        <>
<head>
	<title>Animated Login Form</title>
	<link rel="stylesheet" type="text/css" href="css/style.css" />
	<link href="https://fonts.googleapis.com/css?family=Poppins:600&display=swap" rel="stylesheet" />
	<script src="https://kit.fontawesome.com/a81368914c.js"></script>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<div className='ulogin'>
	<div class="container">
    <div class="">
		</div>
		<div class="login-content">
            <div className='card p-4'>
			  <form  onSubmit={LoginAction}>
				 <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgGmWlFXZQ-5xcRnYDUGVjQ53xGnbcAbekB74evVzUTSZUObrZUNgZFABd5YCb8_bhh0f2zuHPNrU6xNw2vGYUmgEzF_rZ4h1NJNS2Oif5D585QlVHJqYo2Q6CKq5ZqWmw/s220/dhykashare.png" />
				 <h2 class="title mb-5   ">Welcome</h2>
                 <div className='form-group'>
                    <input type='email' placeholder='Enter Email' onChange={e=>setEmail(e.target.value)} id='email' className='p-3 form-control' ></input>
                    <div className='mt-1 text-danger' id='email-msg'></div>
                 </div>
                 <div className='form-group mt-2'>
                    <input type='password' placeholder='Enter Password' onChange={e=>setPassword(e.target.value)} id='password' className='p-3 form-control'></input>
                    <div className='mt-1 text-danger' id='password-msg'></div>
                </div>
                    <input type="submit" class="btn p-2" value="Login" />
                    <Link to={"/emailVerification"} className='mb-3  nav-link h5'>New User?  Register</Link>
                   
            </form>
            </div>
        </div>
    </div>
</div>
</>
    )
}
export default Home;