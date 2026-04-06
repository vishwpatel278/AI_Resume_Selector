const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email : {
        required : true,
        unique : true,
        type : String,
    },
    password : {
        required : true,
        type : String
    },
    roles : {
        type : String,
        enum : ['Admin','JobProvider','User'],
        default : 'User'
    }
})

userSchema.pre('save' , async function() {
    const person = this;

    // if(!person.isModified('password'))return next();

    try{
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(person.password , salt);
        person.password = hashPassword;
        // next();
    }catch(err){
        // return next(err);
    }
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    try{
        const ismatch = await bcrypt.compare(candidatePassword,this.password);
        return ismatch;
    }catch(err){
        throw err;
    }
}

const User = mongoose.model('User',userSchema);

module.exports = User;