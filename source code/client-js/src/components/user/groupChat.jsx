import Cookies from "js-cookie";
import Head from "./head";
import axios from "axios";
import { useEffect, useState } from "react";
const rest = require('../../EndPoints')

function GroupChat(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let groupId = params.get('groupId');
    let userId = params.get('userId');
     const[count,setCount] = useState(0)
     const[fromUser,setFromUser] = useState("")
     const[group,setGroupName] = useState("")
     const[messages,setGroupMessages] = useState([])
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
    const [state, setState] = useState([])
    useEffect(()=>{
        axios.get(rest.endPointGroupMessages+"?groupId="+groupId,header)
        .then(response => {
            console.log(response.data);
            setGroupMessages(response.data)
        })
        .catch(err => {
            console.log(err)
        })
     },[count])
    const SendGroupMessage = e =>{
        e.preventDefault();
        let message = document.getElementById("message").value;
        axios.get(rest.endPointSendGroupMessage+"?groupId="+groupId+"&message="+message,header)
        .then(response => {
            setCount(count+1)
        })
        .catch(err => {
            console.log(err)
        })

    }

    const SendGroupMessage1 = e =>{
        e.preventDefault();
        let data = new FormData();
        data.append("groupId",groupId)
        data.append("files",state.selectedFile)
        axios.post(rest.endPointUploadGroupChatFiles,data,header)
        .then(response => {
            setCount(count+1)
        })
        .catch(err => {
            console.log(err)
        })
    }
    useEffect(()=>{
        axios.get(rest.endPointChatFromUser,header)
        .then(response => {
            console.log(response.data);
            setFromUser(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[])
    useEffect(()=>{
        axios.get(rest.endPointGroupName+"?groupId="+groupId,header)
        .then(response => {
            console.log(response.data);
            setGroupName(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[])
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
    return(
        <>
        <Head/>
        <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-2"></div>
                        <div className="col-md-6">
                        <div className="row">
                        <div className="col-md-6">
                                <div className="text-muted">To : <b>{group['groupName']}</b></div>
                            </div>
                            <div className="col-md-6">
                                <div className="text-muted text-end">From : <b>{fromUser['name']}</b></div>
                            </div>
                            
                         </div>
                            <div className="card p-4" style={{overflow:"auto",height:"60vh"}}>
                                {messages.map((message,index)=>
                                  <div className="card-header">
                                        {""+fromUser['userId'] == ""+message['userModel']['userId']?<>
                                              {message['message']===null?<>
                                              <div className="row">
                                                <div className="col-md-8"></div>
                                                <div className="col-md-4">
                                                <button onClick={()=>openPDF(message['files2'])} className="nav-link bg-success" style={{fontSize:"10px"}}>{message['files']}</button>
                                                </div>
                                              </div>
                                              </>:<>
                                              <div className="text-end">{message['message']}</div>
                                              </>}
                                              <div className="text-end"style={{fontSize:"7px"}} >{message['userModel']['name']}</div>
                                            <div className="text-muted text-end" style={{fontSize:"8px"}}>{message['date'].split(".")[0].replace("T", " ").substring(0, 16)}</div>
                                        </>:<>
                                        {message['message']===null?<>
                                              <button onClick={()=>openPDF(message['files2'])} className="nav-link bg-success" style={{fontSize:"10px"}}>{message['files']}</button>
                                              </>:<>
                                              <div className="">{message['message']}</div>
                                              </>}
                                              <div className=""style={{fontSize:"7px"}} >{message['userModel']['name']}</div>
                                            <div className="text-muted" style={{fontSize:"8px"}}>{message['date'].split(".")[0].replace("T", " ").substring(0, 16)}</div>
                                        </>}
                                  </div>
                                )}
                            </div>
                            <form className="form-control" onSubmit={SendGroupMessage}>
                            <div className="row">
                                    <div className="col-md-8">
                                        <textarea id="message" className="form-control" placeholder="Message"></textarea>
                                    </div>
                                    <div className="col-md-4">
                                       <input type="submit" value={"Send"} className="nav-link bg-primary mt-2 w-100 text-white p-2"></input>
                                    </div>
                              </div>
                            </form>
                            <form className="form-control" onSubmit={SendGroupMessage1}>
                            <div className="row">
                                    <div className="col-md-8">
                                        <input type="file" id="files" onChange={fileSelectedHandler} className="form-controler"></input>
                                    </div>
                                    <div className="col-md-4">
                                       <input type="submit" value={"Upload Files"} className="nav-link bg-primary w-100 text-white p-2"></input>
                                    </div>
                              </div>
                            </form>
                            
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                </div>
        </>
    )
}
export default GroupChat;