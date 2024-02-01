import Cookies from "js-cookie";
import Head from "./head";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const rest = require('../../EndPoints')

function EditProfileImage(){
    const navigate = useNavigate("")
    const [state, setState] = useState([])
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let userId = params.get('userId');
    
    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }
    const fileSelectedHandler = (event) => {
        setState({
        selectedFile: event.target.files[0],
        filename: event.target.files
        })
    }
    const EditAction = e =>{
        e.preventDefault();
        let data = new FormData();
        data.append("userId",userId)
        data.append("picture",state.selectedFile)
        axios.post(rest.endPointEditUserPicture,data,header)
        .then(response => {
            alert(response.data);
            navigate("/userHome")
        })
        .catch(err => {
            console.log(err)
        })

    }
    return(
    
        
        <>
        <Head/>
        <div className="container-fluidt-4 ">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className=" p-4 mt-5">
                        <div className="text-center h5">Upload file</div>
                        <form onSubmit={EditAction} className='form-control p-4'>
                            <div className="form-groupt-2 m">
                                <input type="file" id="picture" onChange={fileSelectedHandler} className="form-control"></input>
                            </div>
                            <input type='submit' value={"Upload"} className='p-2 mt-3 text-white w-100 bg-primary nav-link'></input>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default EditProfileImage;