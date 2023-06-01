import React, {useEffect, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import {Modal} from 'bootstrap';
import '../scss/Tasks.scss';

function Tasks(props) {
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState('');
    const [completedTask, setCompletedTask] = useState();
    const [activeTask, setActiveTask] = useState();
    const [undoState, setUndoState] = useState(localStorage.getItem('undoState'));

    const handleClose = () =>{
        window.location.reload();
    }
    

    const stateUpdation = async (Id, update) => {
        try {
            const response = await axios.post('http://localhost:5001/api/stateUpdate', {
                ID : Id,
                Update : update
            });

        } catch (error) {
           console.log(error);
        }
    }

    const handleCheckboxChange = (taskId) => {
        const updatedTasks = tasks.map((task) => {
          if (task._id === taskId) {
            var newState = !task.state;
            stateUpdation(task._id, newState);
            return {
              ...task,
              state: task.state = newState,
            };
          }
          return task;
        });
        setTasks(updatedTasks);
      };

      const handleCompletedState = () => {
        setCompletedTask(true);
        setActiveTask(false);
      };

      const handleActiveState = () => {
        setActiveTask(true);
        setCompletedTask(false);
      };

      const handleAllState = () => {
        setActiveTask(false);
        setCompletedTask(false);
      };


    const undoOperation = () => {
        const storedTasksString = localStorage.getItem('tasks');
        
        // Convert the string back to an array of objects
        const storedTasks = JSON.parse(storedTasksString);
        console.log(storedTasks);
        const isStoredTasksInTasks = storedTasks.every(storedTask =>
            tasks.some(task =>
                task.title === storedTask.title && task.description === storedTask.description
            )
        );
        
        if(isStoredTasksInTasks===false){
            storedTasks.forEach(task => {
                const postPrevTask = async () => {
                    try {
                        const response = await axios.post('http://localhost:5001/api/undoTask', {
                            Title : task.title,
                            Description : task.description,
                            State: task.state
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
                postPrevTask();

            });
            window.location.reload();
        }
    }

    
    const removeCompleted = () => {
        const completedTaskIds = tasks
        .filter(task => task.state === true)
        .map(task => task._id);

        console.log(Array.toString(completedTaskIds))

        if(completedTaskIds.length > 0){
            const completedTaskArray = tasks
            .filter(task => task.state === true)
            .map(task => task);
            localStorage.setItem('tasks', JSON.stringify(completedTaskArray));


            const postPrevTask = async () => {
                try {
                    const response = await axios.post('http://localhost:5001/api/deleteCompletedTask', {
                        IDs : completedTaskIds
                    });

                    if(response.data == true){
                        const modal = new Modal(document.getElementById('staticBackDrop'));
                        modal.show();
                    }

                } catch (error) {
                    console.log(error);
                }
            }
            postPrevTask()
        }  

    };

    useEffect(() => {
        const fetchTasks = () => {
            axios.get("http://localhost:5001/api/data/db")
                .then(response => {
                    console.log(JSON.parse(JSON.stringify(response.data)))
                    setTasks(response.data);
                })
                .catch(err => console.log(err))
        };
        
        fetchTasks();
      }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold text-primary" href="#" >Tasks <span className='text-secondary'>Page</span></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-4">
                        <li className="nav-item">
                        <Link className="nav-link " aria-current="page" to="/addtasks">Add Task</Link>
                        </li>
                        <li className="nav-item dropdown mx-3">
                        <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="true">
                            Filter 
                        </Link>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" onClick={handleAllState}>All Tasks</Link></li>
                            <li><Link className="dropdown-item" onClick={handleActiveState}>Active Tasks</Link></li>
                            <li><Link className="dropdown-item" onClick={handleCompletedState}>Completed Tasks</Link></li>
                        </ul>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <button type="button" className="btn btn-danger rounded-pill mx-3" id='undoCompleted' onClick={undoOperation}>Undo</button>
                            <button type="button" className="btn btn-danger rounded-pill" onClick={removeCompleted} >Remove Completed</button>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>

            {/* .filter((task) => {
                    return search.toLowerCase() === '' 
                    ? task
                    : task.title.toLowerCase().includes(search);
                }) */}

            <div className="container-fluid d-flex justify-content-center">
                <form className="d-flex my-3 custom-search " role="search">
                    <input className="form-control me-2 rounded-pill" type="search" onChange={(e) => setSearch(e.target.value)} placeholder="Search tasks" aria-label="Search"/>
                </form>
            </div>

            <div className="container-fluid d-flex justify-content-center">
                <div className="container rounded-4 task-list-container overflow-auto">
                {tasks
                .filter((task) => {
                    const searchQuery = search.toLowerCase();
                    const showAllTasks = searchQuery === '';
                    const taskTitle = task.title.toLowerCase();
                    const titleMatch = taskTitle.includes(searchQuery);
                
                    const showCompletedTasks = completedTask === true && task.state === true;
                    const showFilteredTasks = activeTask === true && task.state === false;

                    return(
                        (showAllTasks || titleMatch) && (showCompletedTasks || showFilteredTasks || (!completedTask && !activeTask))
                    )
                })
                .map(task => (
                    <div key={task.id} className="tile container rounded-3 d-flex align-items-center justify-content-between bg-secondary">
                        <Link to={`/taskdetails?taskid=${encodeURIComponent(task._id)}&title=${encodeURIComponent(task.title)}&desc=${encodeURIComponent(task.description)}`} className='text-decoration-none'><h5 className='text-light'>{task.title}</h5></Link>
                        <div className='d-flex align-items-center check-custom '>
                            {/* {new setIsChecked(task.state)} */}
                            <input class="form-check-input fs-3 my-1 checkbox" type="checkbox" id={`${task._id}`} checked={task.state === true} onChange={() => handleCheckboxChange(task._id)} />
                            <label class="form-check-label check-label-custom " for="flexCheckDefault">
                                {task.state == true? "Completed" : "Active"}
                            </label>
                        </div>
                    </div>
                ))}
                    
                </div>
            </div>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackDrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-top">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">To-do <span className='text-secondary'>App</span></h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                </div>
                <div className="modal-body">
                    Deleted All the Completed Task
                </div>
                </div>
            </div>
            </div>
            
        </div>
    );
}

export default Tasks;