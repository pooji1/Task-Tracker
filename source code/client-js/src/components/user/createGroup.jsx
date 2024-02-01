import { useState } from "react";
import Head from "./head";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router";
const rest = require('../../EndPoints')
function CreateGroup(){
    const[groupName,setGroupName] = useState("")
    const[description,setGroupDescription] = useState("")
    const navigate = useNavigate();
    const [state, setState] = useState([])
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
    const CreateGrouop = e =>{
        e.preventDefault();
        console.log(groupName);
        let data = new FormData();
        data.append("groupName",groupName)
        data.append("picture",state.selectedFile)
        data.append("description",description)
        axios.post(rest.endPointCreateGroup,data,header)
        .then(response => {
            alert(response.data);
            navigate("/viewGroups")
            
            
        })
        .catch(err => {
            console.log(err)
            alert("Something Went Wrong")
        })
    }
    return(
        <>
        <Head/>
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4 mt-3 ">
                    <div className="card p-3">
                        <div className="text-center h4">Project Group</div>
                        <form onSubmit={CreateGrouop} className="form-control">
                            <div className="form-group">
                                <label>Group Name</label>
                                <input type="text" id="groupName" onChange={e=>setGroupName(e.target.value)} className="form-control p-3 mt-1" placeholder="Group Name"></input>
                            </div>
                            <div className="form-group">
                                <label>Group Description</label>
                                <textarea  id="description" onChange={e=>setGroupDescription(e.target.value)} className="form-control p-3 mt-1" placeholder="Group description"></textarea>
                            </div>
                            <div className="form-group mt-2">
                                <label>Choose File</label>
                                <input type="file" id="picture" onChange={fileSelectedHandler} className="form-control" ></input>
                            </div>
                            <div className="">
                                <input type="submit"  className="btn btn" value={"Create Group"}></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default CreateGroup;