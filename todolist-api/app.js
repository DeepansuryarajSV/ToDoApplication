const express=require('express');
const mongoose=require('mongoose');
const cors = require('cors');
const loginDetails = require('./routes/Login');
const AddTask = require('./routes/AddTask');
const TaskList = require('./routes/TaskList');
const stateUpdate = require('./routes/StateUpdate');
const taskUpdate = require('./routes/TaskUpdate');
const deleteTask = require('./routes/DeleteTask');
const deleteCompletedTasks = require('./routes/DeleteCompletedTasks');
const undoTaskCompleted = require('./routes/UndoTask');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', loginDetails);
app.use('/api', AddTask);
app.use('/api', TaskList);
app.use('/api', stateUpdate);
app.use('/api', taskUpdate);
app.use('/api', deleteTask);
app.use('/api', deleteCompletedTasks);
app.use('/api', undoTaskCompleted);

mongoose.set('strictQuery', false);


if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const PORT = process.env.PORT || 5001; 
const CONNECTION = process.env.CONNECTION;

const start = async() => {
    try{
        await mongoose.connect(CONNECTION);

        app.listen(PORT, () => {
        console.log('App listening on port ' + PORT);
        });
    }catch(e){
        console.log(e.message);
    }
    
} 
start();