const express=require('express');
const router=express.Router();
const TaskList = require('../models/TaskModel');

router.post("/deleteTask", async (req,res) => {
    const _id = req.body.ID;

    const filter = { _id: `${_id}` };
    const result = await TaskList.deleteOne(filter);
    console.log(result);

    console.log(`${result.deletedCount} document(s) deleted`);

    res.send(result.acknowledged)

    console.log(_id);
});

module.exports = router;