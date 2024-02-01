import  Cookies  from "js-cookie";
import Head from "./head";
import axios from "axios";
import { useEffect, useState } from "react";
const rest = require('../../EndPoints')

function TaskDetails(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let taskId = params.get('taskId');
    const[count,setCount] = useState(0)
    const[task,setAssignedTasks] = useState(0)
    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }
    useEffect(()=>{
    
        axios.get(rest.endPointAssignedTasks1+"?taskId="+taskId,header)
        .then(response => {
            console.log(response.data);
            setAssignedTasks(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[count])
    return(
        <>
        <Head/>
        <div className="container-fluid" style={{marginLeft:"20px"}}>
            <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-10">
            <div className="row">
                    <form>
                     <div className="card p-3">
                        <div className="row">
                            <div className="col-md-4">
                            <div className="text-muted" style={{fontSize:"12px"}}>Task Title</div>
                                <div className="h6">{task['taskTitle']}</div>
                            </div>

                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                            <div className="h6">{task['startDate'].split(".")[0].replace("T", " ").substring(0, 10)} &#8594; {task['endDate'].split(".")[0].replace("T", " ").substring(0, 10)} </div>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-md-3">
                                <div className="text-muted" style={{fontSize:"12px"}}>Task AssignedTo</div>
                                <div className="h6">{task['userModel']['name']}</div>
                            </div>
                            <div className="col-md-2">
                                <div className="text-muted" style={{fontSize:"12px"}}>Task AssignedBy</div>
                                <div className="h6">{task['userModel2']['name']}</div>
                                
                            </div>
                            <div className="col-md-2">
                               <div className="text-muted" style={{fontSize:"12px"}}>Assigned On</div>
                                <div className="h6">{task['assignedDate'].split(".")[0].replace("T", " ").substring(0, 16)}</div>
                            </div>
                            <div className="col-md-2">
                               <div className="text-muted" style={{fontSize:"12px"}}>Priority</div>
                                <div className="h6">{task['priority']}</div>
                            </div>
                            <div className="col-md-3">
                                <div className="text-muted" style={{fontSize:"12px"}}>Task Status</div>
                                <div className="h6">{task['status']}</div>
                            </div>
                            

                        </div>
                        <div className="text-muted" style={{fontSize:"12px"}}>Description</div>
                        <div className="h6 mt-3" style={{overflow:"auto",height:"20px"}}>{task['description']}</div>
                        <div className="text-muted">Discussions</div>
                        <div className="card"></div>
                        <form>
                            <textarea id="discussions" className="form-control" cols={7}></textarea>
                            <input type="submit" value={"Send"} className="bg-primary text-white nav-link p-2"> </input>
                        </form>
                        
                     </div>
                     </form>
                </div>
            </div>
            </div>
        </div>
        </>
    )
}
export default TaskDetails;