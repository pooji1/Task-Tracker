import  Cookies  from "js-cookie";
import Head from "./head";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
const rest = require('../../EndPoints')
function Tasks(){
    const[count,setCount] = useState(0)
    const[assignedTaks,setAssignedTasks] = useState([])
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let groupMemberId = params.get('groupMemberId');
    let userId = params.get('userId');
    let groupId = params.get('groupId');
    const navigate = useNavigate("")
    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }
    const CreateTask = () =>{
        navigate("/createTask?userId="+userId+"&groupMemberId="+groupMemberId+"&groupId="+groupId)
    }
    useEffect(()=>{
        axios.get(rest.endPointAssignedTasks+"?userId="+userId+"&groupMemberId="+groupMemberId,header)
        .then(response => {
            console.log(response.data);
            setAssignedTasks(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[])
    // const GetTaskDetails = (taskId)=>{
    //     navigate("/taskDetails?taskId="+taskId)

    // }
    const GetTaskDetails = (taskId)=>{
        navigate("/viewTask?taskId="+taskId)

    }
    
    return(
        <>
        <Head/>
        <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-10">
                  <div className="">
                    <button onClick={()=>{CreateTask()}} className="nav-link bg-primary p-2">Create Task</button>
                  </div>
                </div>
            </div>
        </div>
        <div className="text-center h6">Assigned Tasks</div>
        <div className="container-fluid" style={{marginLeft:"20px"}}>
            <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-10">
            <div className="row">
                    {assignedTaks.map((assignedTak,index)=>
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
export default Tasks;