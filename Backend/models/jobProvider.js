const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const jobProviderSchema = new mongoose.Schema({
    company : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Company'
    },
    jobTitle : {
        type : String,
    },
    department : {
        type : String,
    },
    jobLocation : {
        type : String,
    },
    employementType : {
        type : String,
    },
    NumberOfOpening : {
        type : Number,
        default : 0,
    },
    jobDescription : {
        type : String,
    },
    skills : {
        type : String,
    },
    minExperience : {
        type : Number,
        default : 0
    },
    educationRequirement : {
        type : String
    },
    resumeArray : {
        type: [
        {
            userEmail: String,
            resume: String,
            text : String
        }
        ],
        default: []
    },
    selectedResume : {
        type: [
        {
            userEmail: String,
            resume: String,
            aiScore : String,
            candidateName : String,
            skillMatchPercent : String,
            matchedSkills : [String],
            missingSkills : [String],
            candidateExperience : String,
            requiredExperience : String,
            educationRequirement : String
        }
        ],
        default: []
    }
})

const jobProvider = mongoose.model('jobProvider',jobProviderSchema);

module.exports = jobProvider;