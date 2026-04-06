const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const companySchema = new mongoose.Schema({
    companyName : {
        type : String,
        required : true
    },
    companyEmail : {
        required : true,
        type : String
    },
    companyWebsite : {
        required : true,
        type : String
    },
    industry : {
        required : true,
        type : String
    },
    companySize : {
        required : true,
        type : Number
    },
    companyLocation : {
        required : true,
        type : String
    },
    contactEmail : {
        required : true,
        type : String
    },
    contactNumber : {
        required : true,
        type : String
    },
    profile : {
        type : String,
    },
    officeAddress : {
        type : String,
        required:true
    },
    enabled : {
        type : Boolean,
        default : false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true
    },
})

const Company = mongoose.model('Company',companySchema);

module.exports = Company;
