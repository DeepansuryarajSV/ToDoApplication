const express=require('express');
const router=express.Router();
const TaskList = require('../models/TaskModel');

router.post("/deleteCompletedTask", async (req,res) => {
    const idsToDelete = req.body.IDs;

    console.log(idsToDelete)

    const result = await TaskList.deleteMany({ _id: { $in: idsToDelete } });
    console.log(result);

    res.send(result.acknowledged);

    console.log(idsToDelete);
});

module.exports = router;