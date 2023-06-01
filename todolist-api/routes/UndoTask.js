const express=require('express');
const router=express.Router();
const AddTaskModel = require('../models/TaskModel');

async function storeTask(Ctitle, Cdescription, CState){
    const data = {
        title : Ctitle,
        description : Cdescription,
        state: CState
    };

    try {
        const newUser = new AddTaskModel(data);
        const result = await newUser.save();
        console.log("Data inserted:", result);
        return true;     
        
    } catch (error) {
        console.log("Error: " + error);
    }
}

router.post("/undoTask", async (req, res) => {
    const title = req.body.Title;
    const description = req.body.Description;
    const state = req.body.State;
    const result = await storeTask(title,description, state);
    res.send(result.acknowledged);
    console.log(result);

});

module.exports = router;