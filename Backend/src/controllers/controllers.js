
import mongoose, { ConnectionStates } from "mongoose";
import {userSchema,infoUserSchema} from "../model/model"
import bcrypt, { compare } from "bcrypt";
const saltRounds = 10;
import jwt from "jsonwebtoken"
var brain=require('brain.js')
const config = {
    binaryThresh: 0.5, // ¯\_(ツ)_/¯
    hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid' // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh']
  };
const net = new brain.NeuralNetwork(config);


const personsInfos=mongoose.model('personsInfos',infoUserSchema)
const User=mongoose.model('User',userSchema)

export const loginReq=((req,res,next)=>{
    console.log(req.body)
    if(req.user){
        console.log(req.user)
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
    let userBody=req.body;
    let newUser=personsInfos(userBody)
            newUser.save(async(err,data)=>{
                if(err){
                    console.log(err)
                    res.send(err)
                }
                    else{

                        res.send(data)


                    }
                }
            )
})

export const testDb=(async(req,res)=>{
    let allData=await  personsInfos.aggregate([
        {
            $project:{
                _id:0,
                Age:1,
                Gender:1,
                "Air Pollution" : 1,
                "Alcohol use" : 1,
                "Dust Allergy" : 1,
               "OccuPational Hazards" : 1,
               "Genetic Risk" : 1,
               "chronic Lung Disease" : 1,
               "Balanced Diet" : 1,
               Obesity : 1,
               Smoking : 1,
               "Passive Smoker" : 1,
               "Chest Pain" : 1,
               "Coughing of Blood" : 1,
               "Fatigue" : 1,
               "Weight Loss" : 1,
               "Shortness of Breath" : 1,
               "Wheezing" : 1,
               "Swallowing Difficulty" : 1,
               "Clubbing of Finger Nails" : 1,
               "Frequent Cold" : 1,
               "Dry Cough" : 1,
               "Snoring" : 1,
               Level:{
                $switch: {
                    branches: [
                      { case: { $eq: [ "$Level", "High" ] }, "then": 3 },
                      { "case": { "$eq": [ "$Level", "Medium" ] }, "then": 2 },
                      { "case": { "$eq": [ "$Level", "Low" ] }, "then": 1 }
                    ],
                    "default": 1
                  }
               }
            }
        }
    ])

    



    console.log(allData)

    res.send(allData[1])
})

