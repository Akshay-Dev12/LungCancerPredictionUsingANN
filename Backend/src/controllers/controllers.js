
import mongoose from "mongoose";
import {userSchema} from "../model/model"



const personsInfos=mongoose.model('personsInfos',userSchema)



export const registerUser =((req,res)=>{
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










