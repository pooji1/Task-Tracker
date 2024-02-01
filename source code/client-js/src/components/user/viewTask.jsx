import Cookies from "js-cookie";
import Head from "./head";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const rest = require('../../EndPoints')

function ViewTask() {
    const navigate = useNavigate("")
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let taskId = params.get('taskId');
    const [task, setAssignedTasks] = useState(undefined)
    const [taskDiscussions, setTaskDiscussions] = useState([])
    const [count, setCount] = useState(0)
    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }
    useEffect(() => {
        axios.get(rest.endPointAssignedTasks1 + "?taskId=" + taskId, header)
            .then(response => {
                console.log(response.data);
                setAssignedTasks(response.data)
                
            })
            .catch(err => {
            })
    }, [count])
    const DisccusionsAction = e => {
        e.preventDefault();
        let discussions = e.target[0].value;
        axios.get(rest.endPointTaskDiscussion + "?taskId=" + taskId + "&discussions=" + discussions, header)
            .then(response => {
                document.getElementById("discussions").value="";
                setCount(count+1)
                
            })
            .catch(err => {
            })

    }
    useEffect(() => {
        axios.get(rest.endPointViewTaskDiscussion + "?taskId=" + taskId, header)
            .then(response => {
                console.log(response.data);
                setTaskDiscussions(response.data)
            })
            .catch(err => {
            })
    }, [count])

    const UpdateTaskCompletion = (taskId)=>{
        navigate("/updateTaskCompletion?taskId="+taskId)

    }

    const StartTask = (taskId)=>{
        axios.get(rest.endPointStartTask + "?taskId=" + taskId, header)
            .then(response => {
                alert(response.data);
                setCount(count+1)
            })
            .catch(err => {
            })
    }
    const SentToQA = ()=>{
        axios.get(rest.endPointSentToQA + "?taskId=" + taskId, header)
            .then(response => {
                alert(response.data);
                setCount(count+1)
            })
            .catch(err => {
            })
    }
    const MarkAsDone = () =>{
        axios.get(rest.endPointMarkAsDone + "?taskId=" + taskId, header)
        .then(response => {
            alert(response.data);
            setCount(count+1)
        })
        .catch(err => {
        })
    }

    const RaiseBug  = ()=>{
        navigate("/raiseBug?taskId="+taskId)
    }
    function openPDF(resultPdf2) {
        const blob = base64ToBlob(resultPdf2);
        const url = URL.createObjectURL( blob );
        const pdfWindow = window.open("");
        pdfWindow.document.write("<iframe width='100%' height='100%' src='" + url + "'></iframe>");
      }
    
    
    
    function base64ToBlob( base64, type = "application/pdf/png/jpg/jpeg" ) {
      const binStr = atob( base64 );
      const len = binStr.length;
      const arr = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        arr[ i ] = binStr.charCodeAt( i );
      }
      return new Blob( [ arr ], { type: type } );
    }
    setInterval(function() {setCount(count+1)}, 2000);
    return (
        <>
            <Head />
            {task != undefined ? <>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-10">
                            <div className="card p-4">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="text-muted" style={{ fontSize: "12px" }}>Task Title</div>
                                        <div className="h6">{task['taskTitle']}</div>
                                    </div>
                                    <div className="col-md-4">
                                        <button className="nav-link text-primary" onClick={()=>openPDF(task['docs2'])} >View Files</button>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="h6">{task['startDate'].split(".")[0].replace("T", " ").substring(0, 10)} &#8594; {task['endDate'].split(".")[0].replace("T", " ").substring(0, 10)} </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="text-muted" style={{ fontSize: "12px" }}>Task AssignedTo</div>
                                        <div className="h6">{task['userModel']['name']}</div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="text-muted" style={{ fontSize: "12px" }}>Task AssignedBy</div>
                                        <div className="h6">{task['userModel2']['name']}</div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="text-muted" style={{ fontSize: "12px" }}>Assigned On</div>
                                        <div className="h6">{task['assignedDate'].split(".")[0].replace("T", " ").substring(0, 16)}</div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="text-muted" style={{ fontSize: "12px" }}>Priority</div>
                                        <div className="h6">{task['priority']}</div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="text-muted" style={{ fontSize: "12px" }}>Task Status</div>
                                        <div className="h6">{task['status']}</div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="text-muted" style={{ fontSize: "12px" }}>Completion Status</div>
                                        <button className="nav-link " onClick={()=>UpdateTaskCompletion(task['taskId'])}>
                                             <div className="h6">{task['percentageOfCompletion']} %</div>
                                        </button>
                                    </div>
                                    {!task['creater']?<>
                                    {task['status']==='TO-DO'?<>
                                        <div className="col-md-3">
                                            <button className="nav-link bg-primary p-1 text-white mt-1" style={{fontSize:"12px"}} onClick={()=>StartTask(task['taskId'])}>Ready To Start
                                            </button>
                                        </div>
                                    </>:<></>}
                                    </>:<></>}
                                    {!task['creater']?<>
                                    {task['status']==='In Progress'?<>
                                        <div className="col-md-3">
                                            <button className="nav-link bg-primary p-1 text-white mt-1" style={{fontSize:"12px"}} onClick={()=>SentToQA(task['taskId'])}>Sent To QA
                                            </button>
                                        </div>
                                    </>:<></>}
                                    </>:<></>}
                                    {task['creater']?<>
                                    {task['status']==='QA'?<>
                                        <div className="col-md-2">
                                            <button className="nav-link bg-primary w-100 p-2 text-white mt-1" style={{fontSize:"12px"}} onClick={()=>MarkAsDone(task['taskId'])}>Mark As Done
                                            </button>
                                        </div>
                                        <div className="col-md-2">
                                            <button className="nav-link bg-primary w-100  p-2 text-white mt-1" style={{fontSize:"12px"}} onClick={()=>RaiseBug(task['taskId'])}>Raise Bug
                                            </button>
                                        </div>
                                    </>:<></>}
                                    </>:<></>}
                                </div>
                                <div className="text-muted" style={{ fontSize: "12px" }}>Description</div>
                                <div className="h6 mt-3" style={{ overflow: "auto", height: "20px" }}>{task['description']}</div>
                                <form className="form-control" onSubmit={DisccusionsAction}>
                                    <div className="row">
                                        <div className="col-md-10">
                                            <textarea id="discussions" className="form-control mt-2" rows={3} cols={4}></textarea>
                                        </div>
                                        <div className="col-md-2">
                                            <input type="submit" value={"Send"} className="bg-primary w-100 mt-3  text-white nav-link p-2"></input>
                                        </div>
                                    </div>
                                </form>
                                <div className="text-center">Discussions</div>
                                    <div className="row">
                                        {taskDiscussions.map((taskDiscussion,index)=>
                                        <div className="card-header mt-1">
                                        <div className="row">
                                            <div className="col-md-10">
                                                {taskDiscussion['discussions']===null?<>
                                                <div className="text-muted" style={{fontSize:"12px"}}>Bug Raised</div>
                                                <div className="h6" style={{overflowY:"scroll",height:"25px",width:'100%'}}>{taskDiscussion['bugComment']}</div>
                                                </>:<>
                                                <div className="h6" style={{overflowY:"scroll",height:"25px",width:'100%'}}>{taskDiscussion['discussions']}</div>
                                                </>}
                                            </div>
                                            <div className="col-md-2">
                                                <div className="" style={{fontSize:"10px"}}>{taskDiscussion['userModel']['name']}</div>
                                                <div className=" " style={{fontSize:"10px"}}>({taskDiscussion['date'].split(".")[0].replace("T", " ").substring(0, 16)})</div>
                                            </div>
                                        </div>
                                        </div>
                                        )}
                                </div>
                                 
                            </div>
                        </div>
                    </div>
                </div>
            </> : <></>}
        </>
    )
}
export default ViewTask;