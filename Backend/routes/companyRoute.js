const express = require('express');
const Company = require('../models/company');
const {jwtAuthMiddleWare,generateToken} = require('../jwt');
const router = express.Router();

router.post('/form',async(req,res) => {
    try{
        const data = req.body;
        const userId = req.user.id;
        const newCompany = new Company({
            ...data,
            user : userId
        }
        );
        const response = await newCompany.save();
        return res.status(200).json('response sent successfully');
    }catch(err){
        console.log(err);
    }
})

module.exports = router;