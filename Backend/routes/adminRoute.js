const express = require('express');
const Company = require('../models/company');
const jobProvider = require('../models/jobProvider');
const User = require('../models/user');
// const {jwtAuthMiddleWare,generateToken} = require('../jwt');
const router = express.Router();

router.get('/list',async (req,res) => {
    try{
        const list = await Company.find();
        const filterlist = list.filter(l => l.enabled === false);
        return res.status(200).json(filterlist);
    }catch(err){
        return res.status(500).json({error : "internal server error"});
    }
})

router.put('/permission/:id',async (req,res) => {
    try{
        const id = req.params.id;
        const company = await Company.findById(id);
        company.enabled = true;
        await company.save()
        const user = await User.findById(company.user);
        user.roles = 'JobProvider';
        await user.save();
        
        // const newjobProvider = new jobProvider();
        // newjobProvider.company = id;
        // const response = await newjobProvider.save();
        return res.status(200).json('updated successfully');
    }catch(err){
        console.log(err);
        return res.status(500).json("internal server error");
    }
})

module.exports = router;