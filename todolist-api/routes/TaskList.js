const express=require('express');
const router=express.Router();
const TaskModel = require('../models/TaskModel');

router.get("/data/db", async (req, res) => {
    const result  = await TaskModel.find();
    // console.log(result)
    res.send(result);
    // res.send(result);
});

module.exports = router;