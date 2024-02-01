import { useNavigate } from "react-router-dom";
import Head from "./head";
import Cookies from "js-cookie";
import axios from "axios";
const rest = require('../../EndPoints')

function RaiseBug(){

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
   const RaiseBugAction = e=>{
    e.preventDefault();
    let bugComment = document.getElementById("bugComment").value;
    axios.get(rest.endPointRaiseBug + "?taskId=" + taskId+"&bugComment="+bugComment, header)
        .then(response => {
            alert(response.data);
            navigate("/viewTask?taskId="+taskId)
        })
        .catch(err => {
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
                        <div className="text-center h5">Raise Bug</div>
                        <form onSubmit={RaiseBugAction} className='form-control p-4'>
                            <div className="form-groupt-2 m">
                                <textarea type="file" id="bugComment" placeholder="Comment" className="form-control"></textarea>
                            </div>
                            <input type='submit' value={"Submit"} className='p-2 mt-3 text-white w-100 bg-primary nav-link'></input>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default RaiseBug;