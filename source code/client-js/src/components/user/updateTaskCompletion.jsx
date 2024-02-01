import Cookies from "js-cookie";
import Head from "./head";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const rest = require('../../EndPoints')

function UpdateTaskCompletion(){
    const navigate = useNavigate("")
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let taskId = params.get('taskId');
    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }
    const UpdateTaskStatus = e =>{
        e.preventDefault();
        let percentageOfCompletion = document.getElementById("percentageOfCompletion").value;
        axios.get(rest.endPointUpdateTaskComplStatus+"?percentageOfCompletion="+percentageOfCompletion+"&taskId="+taskId,header)
        .then(response => {
            alert(response.data);
            navigate("/viewTask?taskId="+taskId)
        })
        .catch(err => {
            console.log(err)
        })

    }

    return(
        <>
        <Head/>
        <div className="container-fluid mt-3">
           <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <div className="card p-3 mt-3">
                    <form className="form-control" onSubmit={UpdateTaskStatus}>
                        <div className="form-group">
                            <label>Update Task</label>
                            <input type="number" className="form-control mt-2"  id="percentageOfCompletion"></input>
                        </div>
                        <input type="submit" value={"Update"} className="bg-primary w-100 mt-3 text-white p-1 nav-link" />
                    </form>
                </div>
              </div>
           </div>
        </div>

        </>
    )
}
export default UpdateTaskCompletion;