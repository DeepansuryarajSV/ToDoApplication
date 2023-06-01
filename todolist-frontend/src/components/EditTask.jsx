import React, {useEffect, useState} from 'react';
import { Link, useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import '../scss/AddTask.scss';
import '../scss/TaskDetails.scss';
import {Modal} from 'bootstrap';

function EditTask(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const [taskID, setTaskID] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [initTitle, setInitTitle] = useState("");
    const [initDescription, setInitDescription] = useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        setInitTitle(urlParams.get('title'));
        setInitDescription(urlParams.get('desc'));
        setTaskID(urlParams.get('taskid'));
        setTitle(urlParams.get('title'));
        setDescription(urlParams.get('desc'));
    }, [location.search]);

    const handleTitleChange = (e) =>{
        setTitle(e.target.value);
    };

    const handleDescChange = (e) =>{
        setDescription(e.target.value);
    };

    const saveChanges = () => {

        if((initTitle !== title) || (initDescription != description)){

        const taskUpdation = async () => {
            try {
                const response = await axios.post('http://localhost:5001/api/taskUpdate', {
                    ID : taskID,
                    TitleUpdate : title,
                    DescriptionUpdate : description
                });
    
                if(response.data === true){
                    const modal = new Modal(document.getElementById('staticBackdrop'));
                    modal.show();
                    navigate(`/taskdetails?taskid=${encodeURIComponent(taskID)}&title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`);
                }
                else{
                    alert("Sucess");
                }
            } catch (error) {
                console.log(error);
            }
        }
        taskUpdation();
        }

    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold text-primary" href="#" >Edit <span className='text-secondary'>Task</span> Page</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                        <Link className="nav-link " aria-current="page" to={`/taskdetails?taskid=${encodeURIComponent(taskID)}&title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`}>Task Details Page </Link>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>

            <div className="container-fluid d-flex justify-content-center">
                <div class="mb-3 custom-addtask-container my-5">
                    <label for="u-tasktitle" class="form-label">Task Title</label>
                    <input type="email" class="form-control" value={title} id="u-tasktitle" onChange={handleTitleChange}/><br />
                    <label for="u-taskdesc" class="form-label">Task Description</label>
                    <textarea class="form-control non-resizable" id="u-taskdesc" rows="6" value={description} onChange={handleDescChange}></textarea><br />
                    <button type="button" class="btn btn-success custom-button-reg rounded-pill" onClick={saveChanges}>Save Change</button>
                </div>
            </div>

            {/* <!-- Modal --> */}
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-top">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">To-do <span className='text-secondary'>App</span></h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Changes Saved Successfully
                </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default EditTask;