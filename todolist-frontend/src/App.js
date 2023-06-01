import React from 'react';
import Login from './components/login';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import TaskDetails from './components/TaskDetails';
import EditTask from './components/EditTask';
import '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App(props) {
  return (
    <Router>
      <div className='main-container'>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/tasks' element={<Tasks/>}/>
          <Route path='/addtasks' element={<AddTask/>}/>
          <Route path='/taskdetails' element={<TaskDetails/>}/>
          <Route path='/taskedit' element={<EditTask/>}/>
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;

