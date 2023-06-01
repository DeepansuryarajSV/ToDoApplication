import React, {useEffect, useState} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {Modal} from 'bootstrap';
import '../scss/AddTask.scss';
import '../scss/TaskDetails.scss';

function TaskDetails(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const [taskID, setTaskID] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    var modal;
    

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        setTaskID(urlParams.get('taskid'));
        setTitle(urlParams.get('title'));
        setDescription(urlParams.get('desc'));
    }, [location.search]);

    const EditPageNavigate = () => {
        navigate(`/taskedit?taskid=${encodeURIComponent(taskID)}&title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`);
    };

    const DeleteAction = async () => {

        //Backup
        const data = {
            Title: title,
            Description: description
        };

        const dataString = JSON.stringify(data);

        // Store the string in localStorage
        localStorage.setItem('backup', dataString);

        try {
            const response = await axios.post('http://localhost:5001/api/deleteTask', {
                ID : taskID,
            });

            if(response.data === true){
                
                const undoBtn = document.getElementById('undo-btn');
                modal = new Modal(document.getElementById('staticBackdrop'));
                modal.show();
                
                undoBtn.addEventListener('click', () => {
                    // Retrieve the string from localStorage
                    const storedDataString = localStorage.getItem('backup');

                    // Convert the string back to an object
                    const storedData = JSON.parse(storedDataString);

                    // Access the values in the object
                    const tit = storedData.Title;
                    const desc = storedData.Description;

                    const postPrevTask = async () => {
                        try {
                            const response = await axios.post('http://localhost:5001/api/addTask', {
                                Title : tit,
                                Description : desc
                            });

                            if(response.data == true){
                                localStorage.removeItem('backup');
                                navigate("/tasks");
                                modal.hide();
                            }
            
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    postPrevTask();
                });

            }
            else{
                alert("Sucess");
            }
        } catch (error) {
            console.log(error);
        }
    
    };

    const closeFn = () => {
        modal.hide();
        navigate('/tasks');
    }


    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold text-primary" href="#" >Task <span className='text-secondary'>Details</span> Page</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link " aria-current="page" to="/tasks">Task list Page </Link>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>

            <div className="container-fluid d-flex justify-content-center">
                <div className="mb-3 custom-addtask-container my-5">
                    <label for="tasktitle" className="form-label">Task Title</label>
                    <input type="email" className="form-control" value={title} id="tasktitle" style={{ cursor: 'pointer' }} readOnly/><br />
                    <label for="taskdesc" className="form-label">Task Description</label>
                    <textarea className="form-control non-resizable" id="taskdesc" rows="6" value={description} style={{ cursor: 'pointer' }} readOnly></textarea><br />
                    <div className='buttons-div'>
                        <button type="button" className="btn btn-danger  rounded-pill" onClick={DeleteAction}>Delete Task</button>
                        <button type="button" className="btn btn-success rounded-pill mx-5" onClick={EditPageNavigate} >Edit Task</button>
                    </div>
                </div>
            </div>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-top">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">To-do <span className='text-secondary'>App</span></h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    Task Deleted Succesfully
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success task-details-undo" id='undo-btn'>Undo</button>
                    <button type="button" class="btn btn-danger" onClick={closeFn}>close</button>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default TaskDetails;