import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Modal} from 'bootstrap';
import '../scss/AddTask.scss';

function AddTask(props) {
    const navigate = useNavigate();

    function submitTask(){
        var title = document.getElementById("tasktitle").value;
        var description = document.getElementById("taskdesc").value;

        const postNewTask = async () => {
            try {
                const response = await axios.post('http://localhost:5001/api/addTask', {
                    Title : title,
                    Description : description
                });

                console.log(response.data);
                if(response.data === "false"){
                    alert("Invalid User");
                    // setResponseText(false);
                }
                else{
                    const modal = new Modal(document.getElementById('staticBackdrop'));
                    modal.show();
                    navigate('/tasks');
                    // navigate('/tasks');
                }
            } catch (error) {
                
            }
        }
        postNewTask();

    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold text-primary" href="#" >Add Task <span className='text-secondary'>Page</span></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                        <Link className="nav-link " aria-current="page" to="/addtasks">Task list Page </Link>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
            <div className="container-fluid d-flex justify-content-center">
                <div class="mb-3 custom-addtask-container my-5">
                    <label for="tasktitle" class="form-label">Task Title</label>
                    <input type="email" class="form-control" id="tasktitle" placeholder="Eg: English Assignment"/><br />
                    <label for="taskdesc" class="form-label">Task Description</label>
                    <textarea class="form-control non-resizable" id="taskdesc" rows="6" placeholder='Eg: Part A & B - Unit 1'></textarea><br />
                    <button type="button" class="btn btn-success custom-button-reg rounded-pill" onClick={submitTask}>Add Task</button>
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
                    Task Added Successfully
                </div>
                </div>
            </div>
            </div>
            
        </div>
    );
}

export default AddTask;