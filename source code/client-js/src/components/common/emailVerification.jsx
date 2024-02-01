import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const rest = require('../../EndPoints')
function EmailVerification(){
    const[email,setEmail] = useState("")
    const navigate = useNavigate();
    let header = {
        headers: {
            "Content-type": "Application/json"
        }
    }
    
    const VerifyEmail = (e) =>{
        e.preventDefault();
        if(email.length===0){
            alert("Enter Email")
            return
        }
        axios.get(rest.endPointVerifyEmail+"?email="+email,header)
        .then(response => {
          if(response.data!='Email Exists'){
            alert("Email Verified")
            console.log(email);
            setEmail("")
            navigate("/userRegistration?otp="+response.data+"&email="+email)
          }else{
            alert(response.data)
            setEmail("")
            return
          }
          
       })
       .catch(err => {
          console.log(err);
       })

    }
    return(
        <>
        <div className="container-fluidt-4 ">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className=" p-4 mt-5">
                        <div className="text-center h5">Verify Email</div>
                        <form onSubmit={VerifyEmail} className='form-control p-4'>
                            <div className="form-groupt-2 m">
                                <label>Email</label>
                                <input type="email" id="email" onChange={e => setEmail(e.target.value)} className="form-control p-3" placeholder="Enter Email"></input>
                            </div>
                            <input type='submit' value={"Verify"} className='p-2 mt-3 text-white w-100 bg-primary nav-link'></input>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default EmailVerification