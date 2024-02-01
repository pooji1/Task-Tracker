import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Head from "./head";
const rest = require('../../EndPoints')
function GroupTasks(){
    const navigate = useNavigate("")
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let groupId = params.get('groupId');
    let userId = params.get('userId');
    const[tasks,setTasks] = useState([])
    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }
    useEffect(()=>{
        axios.get(rest.endPointGroupTasks+"?groupId="+groupId,header)
        .then(response => {
            console.log(response.data);
            setTasks(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[])
    const GetTaskDetails = (taskId)=>{
        navigate("/viewTask?taskId="+taskId)

    }
    
    return(
        <>
        <Head/>
        <div className="text-center h6">Assigned Tasks</div>
        <div className="container-fluid" style={{marginLeft:"20px"}}>
            <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-10">
            <div className="row">
                    {tasks.map((assignedTak,index)=>
                    <form>
                     <div className="card p-3 mt-1">
                        <div className="row">
                            <div className="col-md-4">
                            <div className="text-muted" style={{fontSize:"12px"}}>Task Title</div>
                                <button className="nav-link" onClick={()=>GetTaskDetails(assignedTak['taskId'])}>
                                <div className="h6">{assignedTak['taskTitle']}</div>
                                </button>
                            </div>

                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                            <div className="h6">{assignedTak['startDate'].split(".")[0].replace("T", " ").substring(0, 10)} &#8594; {assignedTak['endDate'].split(".")[0].replace("T", " ").substring(0, 10)} </div>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-md-3">
                                <div className="text-muted" style={{fontSize:"12px"}}>Task AssignedTo</div>
                                <div className="h6">{assignedTak['userModel']['name']}</div>
                            </div>
                            <div className="col-md-2">
                                <div className="text-muted" style={{fontSize:"12px"}}>Task AssignedBy</div>
                                <div className="h6">{assignedTak['userModel2']['name']}</div>
                                
                            </div>
                            <div className="col-md-2">
                               <div className="text-muted" style={{fontSize:"12px"}}>Assigned On</div>
                                <div className="h6">{assignedTak['assignedDate'].split(".")[0].replace("T", " ").substring(0, 16)}</div>
                            </div>
                            <div className="col-md-2">
                               <div className="text-muted" style={{fontSize:"12px"}}>Priority</div>
                                <div className="h6">{assignedTak['priority']}</div>
                            </div>
                            <div className="col-md-3">
                                <div className="text-muted" style={{fontSize:"12px"}}>Task Status</div>
                                <div className="h6">{assignedTak['status']}</div>
                            </div>
                            

                        </div>
                     </div>
                     </form>
                     )}
                </div>
            </div>
            </div>
        </div>
        </>
    )
}
export default GroupTasks;