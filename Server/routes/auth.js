const express = require('express');
const  router = express.Router();
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
const db = require('../db');

//SignUp
router.post('/signup',(req,res)=>{
    const {username,email,password}=req.body;

    const checkEmail="Select * from users where email = ? "
    db.query(checkEmail, [email],async (err,result)=>{
        if(err){
            return res.status(500).json({message: 'Server error'})
        }
        if(result && result.length > 0) {
            return res.status(400).json({message: 'Email already exists'})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const insertUser = 'Insert INTO USERS (username, email,password) VALUES (?,?,?)'
        db.query (insertUser, [username,email,hashedPassword],(err,result)=>{
            if(err){
                return res.status(500).json({ message: 'Server error' })
            }
            res.status(201).json({message: 'User created successfully '})
        })
    })
})
 
//Login
router.post('/login',(req,res)=>{
    const {email,password} = req.body;

    const findUser = 'Select * from users where email = ?'
    db.query(findUser,[email],async (err,result)=>{
        if(result.length === 0){
            return res.status(400).json({message:"User Not found"})
        }

        const user =result[0];
        const isMatch= await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({message: 'Invalid Password'})
        }
        
        const token =jwt.sign({id:user.id},process.env.JWT_SECRET,{
            expiresIn: '7d'
        })

        res.json({token, username: user.username})
    })
})

module.exports=router;