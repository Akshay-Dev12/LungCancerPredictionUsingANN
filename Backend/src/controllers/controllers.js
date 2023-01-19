
import mongoose from "mongoose";
import {userSchema,infoUserSchema} from "../model/model"
import bcrypt from "bcrypt";
const saltRounds = 10;
import jwt from "jsonwebtoken"



const personsInfos=mongoose.model('personsInfos',infoUserSchema)
const User=mongoose.model('User',userSchema)

export const loginReq=((req,res,next)=>{
    console.log(req.body)
    if(req.user){
        next()
    }else{
        res.send("You are not a authorised user")

    }
})


export const registerUser =((req,res)=>{
    // console.log(req.body)
    let userBody=req.body;
    bcrypt.hash(userBody.password, saltRounds, function(err, hash) {
        if(err){
            res.send("Password not hashed")
        }else{
            console.log(hash)
            userBody.password=hash;
            let newUser=User(userBody)
            newUser.save((err,user)=>{
                if(err){
                    res.send(err)
                }else{
                    res.send("Sucessfully Stored"+user)
                }
            })
        }
    });
})


export const login=(async(req,res)=>{
    let login=req.body;
    let user=await User.findOne({email:login.email})
    !user && res.send("No user")
    const match = await bcrypt.compare(login.password, user.password);
    if(match){
        res.json({token:jwt.sign({email:match.email,username:match.name,id:match.id},'RAZORPAY')})
    }else{
        res.send("Credientials not matched")
    }
})

export const infoUser =((req,res)=>{
    console.log("Here")
    // console.log(req.body)
    let userBody=req.body;
    let newUser=personsInfos(userBody)
            newUser.save((err,user)=>{
                if(err){
                    console.log(err)
                    res.send(err)
                }else{
                    res.send("Sucessfully Stored"+user)
                }
            })
})


