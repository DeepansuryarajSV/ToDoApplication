const express=require('express');
const router=express.Router();
const LoginModel = require('../models/LoginModel');


async function checkUserExists(username, password) {
  try {
    // Find a user with the provided username and passwor
    // console.log(username + password)
    const user = await LoginModel.findOne({ email: username, password: password }).exec();
    if (user) {
        const {name} = user;
        console.log('User exists');
        return true;
    } else {
        console.log('User does not exist');
        return false;
    }
  } catch (error) {
        console.error('Error checking user:', error);
        return false;
  }
}

router.post('/loginDetails', async (req,res) => {
    const email = req.body.Email;
    const password = req.body.Password;

    const result = await checkUserExists(email,password);

    if(result){
        res.send("valid User");
    }
    else{
        res.send("invalidUser");
    }
})

module.exports = router;