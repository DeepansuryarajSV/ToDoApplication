const express=require('express');
const router=express.Router();
const TaskList = require('../models/TaskModel');

router.post("/stateUpdate", async (req,res) => {
    const _id = req.body.ID;
    const stateUpdate = req.body.Update;

    const filter = { _id: `${_id}` };
    const update = { $set: { state: stateUpdate } };

    const result = await TaskList.updateOne(filter, update);

    console.log(`${result.modifiedCount} document(s) updated`);

    console.log(_id);
});

module.exports = router;