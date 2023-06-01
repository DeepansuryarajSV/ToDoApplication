const express=require('express');
const router=express.Router();
const AddTaskModel = require('../models/TaskModel');

async function storeTask(Ctitle, Cdescription){
    const data = {
        title : Ctitle,
        description : Cdescription,
        state: false
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

router.post("/addTask", async (req, res) => {
    const title = req.body.Title;
    const description = req.body.Description;

    const result = await storeTask(title,description);
    res.send(result);
    console.log(result);

});

module.exports = router;