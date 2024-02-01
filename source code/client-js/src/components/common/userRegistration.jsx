import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const rest = require('../../EndPoints')

function UserRegistration(){
    const [state, setState] = useState([])
    const navigate = useNavigate();
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let email = params.get('email');
    let otp = params.get("otp");
    const[name,setName] = useState("");
    const[phone,setPhone] = useState("")
    const[password,setPassword] = useState("")
    const[otp2,setOtp] = useState("")
    let header = {
        headers: {
            "Content-type": "Application/json"
        }
    }
    const fileSelectedHandler = (event) => {
        setState({
        selectedFile: event.target.files[0],
        filename: event.target.files
        })
    }
    

    const RegisterNow = e =>{
        e.preventDefault();
        let data = new FormData();
        data.append("name",name)
        data.append("email",email)
        data.append("password",password)
        data.append("otp",otp)
        data.append("phone",phone)
        data.append("picture",state.selectedFile)
        data.append("otp2",otp2)
        axios.post(rest.endPointUserReg,data,header)
        .then(response => {
            if(response.data['Duplicate Phone Number']==='Duplicate Phone Number'){
                alert(response.data)
                return
            }else if(response.data['Account Registered Successfully']==='Account Registered Successfully'){
                alert(response.data)
                return
            }else{
                alert(response.data)
                navigate("/");
            }
            
            
        })
        .catch(err => {
            console.log(err)
            alert("Something Went Wrong")
        })
    }

   
    return(
        <>
        <div className="container-fluidt-4 ">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="card p-4 mt-5">
                        <div className="text-center h3">Register Here</div>
                        <form onSubmit={RegisterNow}>
                        <div className="form-group">
                                <label>OTP</label>
                                <input type="number" id="otp2" onChange={e => setOtp(e.target.value)} className="form-control" placeholder="Enter OTP"></input>
                            </div>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" id="name" onChange={e => setName(e.target.value)} className="form-control" placeholder="Enter Name"></input>
                            </div>
                            <div className="form-group mt-2">
                                <input type="hidden" id="email" value={email}></input>
                            </div>
                            <div className="form-group mt-2 ">
                                <label>Phone</label>
                                <input type="tel" id="phone" onChange={e=> setPhone(e.target.value)} className="form-control" placeholder="Enter Phone"></input>
                            </div>
                            <div className="form-group mt-2 ">
                                <label>Password</label>
                                <input type="password" id="password" onChange={e=>setPassword(e.target.value)} className="form-control" placeholder="Enter Password"></input>
                            </div>
                            <div className="form-group mt-2">
                                <label>Choose File</label>
                                <input type="file" id="picture" onChange={fileSelectedHandler} className="form-control" ></input>
                            </div>
                            <input type="submit" value={"Register"} className="btn"></input>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default UserRegistration;