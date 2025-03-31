const jwt = require('jsonwebtoken');
const User = require("../model/userModel"); 
const bcrypt = require('bcrypt');
const Project = require("../model/projectModel");
// const user = require('../model/userModel');

const maxAge = 3 * 24 * 60 * 60 * 1000; 

const signup = async function (req, res, next) {
    try {
        const { email, password,name} = req.body; 
        
        if (!email || !password) {
            return res.status(400).send('Email and password are required');
        }
        if(await user.find({userName:name}) > 0) return res.status(200).json({message : 'user already exists'});
        const newUser = await User.create({ email, password,userName:name}); 
        const token = await jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: '3d' });
        res.cookie("jwt", token, {
            maxAge: 3 * 24 * 60 * 60 * 1000, 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'Lax', 
            path: '/' 
        });
    
        return res.status(201).json({
            user:{
                id:newUser.id,
                email:newUser.email,
                userName:newUser.userName
            }
        })
    } catch (err) {
        console.error(err); 
        return res.status(500).send('Internal server error');
    }
};

const login = async function (req, res, next) {
    try {
        const { email, password } = req.body; 
        if (!email || !password) {
            return res.status(400).send('Email and password are required');
        }
        
        const newUser = await User.findOne({email}); 
        if(!newUser)
        {
            res.status(201).send('User not found');
            return;
        }
        const passwordCheck = await bcrypt.compare(password,newUser.password);
        if(!passwordCheck){
            res.send('Incorrect password');
            return;
        }
        const token = await jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: '3d' });
        res.cookie("jwt", token, {
            maxAge: 3 * 24 * 60 * 60 * 1000, 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'Lax', 
            path: '/' 
        });
        const projectDetailsOfTheUser = [];
        if(newUser.projectName) {
            for(id of newUser.hashedProject) {
                const project = await Project.findOne({ _id:id});
                projectDetailsOfTheUser.push(project);
            }
            return res.status(201).json({
                user:newUser,
                projectDetails : projectDetailsOfTheUser
            })
        }
        return res.status(201).json({
            user:newUser
        })
    } catch (err) {
        console.error(err); 
        return res.status(500).send('Internal server error');
    }
};
const getUserInfo = async function (req, res, next) {
    try {
        console.log(req.email);
        const userData = await User.find({email:req.email});
        if(!userData) {
            return res.status(404).send("User with given detail not found");
        }
        return res.status(201).json({
            id:userData.id,
            email:userData.email,
            profileSetup:userData.ProfileSetup,
            image:userData.image,
            firstName:userData.firstName,
            lastName:userData.lastName,
            color:userData.color
        })
    } catch (err) {
        console.error(err); 
        return res.status(500).send('Internal server error');
    }
};
module.exports = {signup,login,getUserInfo};