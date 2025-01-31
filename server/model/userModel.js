
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"],
        unique:false,
    },
    name : String,
    projectName:{
        type:Array,
        required:false,
        unique:false
    },
    hashedProject:Array
});


userSchema.pre('save', async function(next) {
    try {
        if (this.isModified('password')) { 
            this.password = await bcrypt.hash(this.password, 10);
        }
        next();
    } catch (err) {
        next(err);
    }
});


const user = mongoose.model("user",userSchema);

module.exports = user;
