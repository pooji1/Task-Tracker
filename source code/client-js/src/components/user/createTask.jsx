import { useEffect, useState } from "react";
import Head from "./head";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const rest = require('../../EndPoints')


function CreateTask() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let userId = params.get('userId');
    let groupMemberId = params.get('groupMemberId');
    let groupId = params.get('groupId');
    const navigate = useNavigate("")
    const [state, setState] = useState([])
    const [taskTitle, setTaskTitle] = useState("")
    let [startDate, setStartDate] = useState("")
    let [endDate, setEndDate] = useState("")
    const [priority, setPriority] = useState("")
    const [description, setDescription] = useState("")
    const[groupMembers,setGroupMembers] = useState([])

    const fileSelectedHandler = (event) => {
        setState({
            selectedFile: event.target.files[0],
            filename: event.target.files
        })
    }
    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }
    const CreateTaskAction = e => {
        e.preventDefault();
        let priority = document.getElementById("priority").value;
        let userId = document.getElementById("userId").value;
        console.log(priority);
        let data = new FormData();
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        data.append("taskTitle", taskTitle)
        data.append("docs", state.selectedFile)
        data.append("startDate", startDate)
        data.append("description", description)
        data.append("endDate", endDate)
        data.append("priority", priority)
        data.append("userId", userId)
        axios.post(rest.endPointCreateTask, data, header)
            .then(response => {
                alert(response.data);
                navigate("/viewGroups")
            })
            .catch(err => {
                console.log(err)
                alert("Something Went Wrong")
            })
    }
    useEffect(() => {
        axios.get(rest.endPointGroupMembers+"?groupId="+groupId, header)
            .then(response => {
                console.log(response.data);
                setGroupMembers(response.data)
            })
            .catch(err => {
            })
    }, [])

    return (
        <>
            <Head />
            <div className="container-fluidt-4 ">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <div className="card p-4 mt-5">
                            <div className="text-center h3">Fill Form</div>
                            <form onSubmit={CreateTaskAction} className="form-control">
                                <div className="form-group mt-1">
                                    <label>Tasl Title</label>
                                    <input type="text" name="taskTitle" id="taskTitle" onChange={e => setTaskTitle(e.target.value)} placeholder="Enter Title" className="form-control mt-1" style={{ width: "100%" }}></input>
                                </div>
                                <div className="form-group mt-1">
                                    <label>Start Date</label>
                                    <input type="date" name="startDate" id="startDate" onChange={e => setStartDate(e.target.value)} className="form-control mt-1"></input>
                                </div>
                                <div className="form-group mt-1">
                                    <label>End Date</label>
                                    <input type="date" name="endDate" onChange={e => setEndDate(e.target.value)} id="endDate" className="form-control mt-1"></input>
                                </div>
                                <div className="form-group mt-1">
                                    <label>Priority</label>
                                    <select className="form-control" id="priority" onChange={e => setPriority(e.target.value)}>
                                        <option value={"5"}>5</option>
                                        <option value={"4"}>4</option>
                                        <option value={"3"}>3</option>
                                        <option value={"2"}>2</option>
                                        <option value={"1"}>1</option>
                                    </select>
                                </div>
                                <div className="form-group mt-1">
                                    <label>Choose Files</label>
                                    <input type="file" name="docs" id="docs" onChange={fileSelectedHandler} className="form-control mt-1"></input>
                                </div>
                                <div className="form-group mt-1">
                                    <label>Description</label>
                                    <textarea name="description" onChange={e => setDescription(e.target.value)} id="description" className="form-control mt-1"></textarea>
                                </div>
                                <div className="form-group mt-1">
                                    <label>Select User</label>
                                    <select className="form-control" id="userId" required>
                                        <option value={""}>Choose Member</option>
                                        {groupMembers.map((groupMember,index)=><>
                                        {groupMember['groupMemberId']==groupMemberId?<>
                                            <option value={groupMember['userModel']['userId']} selected>{groupMember['userModel']['name']}</option>
                                         </>:<>
                                             <option value={groupMember['userModel']['userId']}>{groupMember['userModel']['name']}</option>
                                        </>}
                                        </>
                                        
                                        )}
                                    </select>
                                </div>

                                <input type="submit" value={"Assign Task"} className="bg-primary  mt-3 w-100 p-2 text-white nav-link"></input>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default CreateTask;