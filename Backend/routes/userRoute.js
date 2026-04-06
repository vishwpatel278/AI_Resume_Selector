const express = require('express');
const User = require('../models/user');
const {jwtAuthMiddleWare,generateToken} = require('../jwt')
const router = express.Router();

router.post('/signup',async(req,res) => {
    try{
        const data = req.body;
        const newPerson = new User(data);
        const response = await newPerson.save();
        const payload = {
            email : response.email,
            id : response.id,
            role : response.roles
        }
        const token = generateToken(payload);

        res.status(200).json({token : token});
        
    }catch(err){
        console.log(err);
    }
})

router.post('/login',async(req,res) => {
    try{
        const data = req.body;
        // const newPerson = new Person(data);
        const email = data.email;
        const user = await User.findOne({email : email});
        if(!user)return res.status(404).json({error : 'user not found'});

        const password = data.password;

        if(!(await user.comparePassword(password))){
            return res.status(400).json({error : 'Incorrect password or username'});
        }
        const payload = {
            username : user.email,
            id : user.id,
            role : user.roles
        }
        const token = generateToken(payload);
        res.status(200).json(token);
    }catch(err){
        console.log(err);
    }
})

module.exports = router;