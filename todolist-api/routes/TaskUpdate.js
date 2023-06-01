const express=require('express');
const router=express.Router();
const TaskUpdate = require('../models/TaskModel');

router.post("/taskUpdate", async (req,res) => {
    const _id = req.body.ID;
    const titleUpdate = req.body.TitleUpdate;
    const descriptionUpdate = req.body.DescriptionUpdate;

    const filter = { _id: `${_id}` };
    const update = { $set: { title: titleUpdate, description: descriptionUpdate } };

    const result = await TaskUpdate.updateOne(filter, update);
    console.log(`${result.modifiedCount} document(s) updated`);

    res.send(result.acknowledged);
});

module.exports = router;