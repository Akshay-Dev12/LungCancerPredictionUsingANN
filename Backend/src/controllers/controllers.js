
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
                input:{
                Age:1,
                Gender:1,
                "Air Pollution" : "$Air Pollution",
                "Alcohol use" : "$Alcohol use",
                "Dust Allergy" : "$Dust Allergy",
               "OccuPational Hazards" : "$OccuPational Hazards",
               "Genetic Risk" : "$Genetic Risk",
               "chronic Lung Disease" : "$chronic Lung Disease",
               "Balanced Diet" : "$Balanced Diet",
               Obesity : "$Obesity",
               Smoking : "$Smoking",
               "Passive Smoker" : "$Passive Smoker",
               "Chest Pain" : "$Chest Pain",
               "Coughing of Blood" : "$Coughing of Blood",
               "Fatigue" : "$Fatigue",
               "Weight Loss" : "$Weight Loss",
               "Shortness of Breath" : "$Shortness of Breath",
               "Wheezing" : "$Wheezing",
               "Swallowing Difficulty" : "$Swallowing Difficulty",
               "Clubbing of Finger Nails" : "$Clubbing of Finger Nails",
               "Frequent Cold" : "$Frequent Cold",
               "Dry Cough" : "$Dry Cough",
               "Snoring" : "$Snoring"
                },
                output:{
                    Level:{
                        $switch: {
                            branches: [
                              { case: { $eq: [ "$Level", "High" ] }, "then": 2},
                              { "case": { "$eq": [ "$Level", "Medium" ] }, "then": 1},
                              { "case": { "$eq": [ "$Level", "Low" ] }, "then": 0}
                            ],
                            "default": 1
                          }
                       }

                }

            }
        },
        {$limit:100}
    ])

    net.train(allData);

    // const output =net.run({
    //     "index" : 19,
    //     "Age" : 14,
    //     "Gender" : 1,
    //     "Air Pollution" : 2,
    //     "Alcohol use" : 4,
    //     "Dust Allergy" : 5,
    //     "OccuPational Hazards" : 6,
    //     "Genetic Risk" : 5,
    //     "chronic Lung Disease" : 5,
    //     "Balanced Diet" : 4,
    //     "Obesity" : 6,
    //     "Smoking" : 5,
    //     "Passive Smoker" : 4,
    //     "Chest Pain" : 6,
    //     "Coughing of Blood" : 5,
    //     "Fatigue" : 5,
    //     "Weight Loss" : 3,
    //     "Shortness of Breath" : 2,
    //     "Wheezing" : 1,
    //     "Swallowing Difficulty" : 4,
    //     "Clubbing of Finger Nails" : 7,
    //     "Frequent Cold" : 2,
    //     "Dry Cough" : 1,
    //     "Snoring" : 6,
    // })

    const output=net.run({
        "Age" : 44,
        "Gender" : 1,
        "Air Pollution" : 6,
        "Alcohol use" : 7,
        "Dust Allergy" : 7,
        "OccuPational Hazards" : 7,
        "Genetic Risk" : 7,
        "chronic Lung Disease" : 6,
        "Balanced Diet" : 7,
        "Obesity" : 7,
        "Smoking" : 7,
        "Passive Smoker" : 8,
        "Chest Pain" : 7,
        "Coughing of Blood" : 7,
        "Fatigue" : 5,
        "Weight Loss" : 3,
        "Shortness of Breath" : 2,
        "Wheezing" : 7,
        "Swallowing Difficulty" : 8,
        "Clubbing of Finger Nails" : 2,
        "Frequent Cold" : 4,
        "Dry Cough" : 5,
        "Snoring" : 3,
    }) //High
    
    // const output=net.run({
    //  "Age" : 52,
    // "Gender" : 2,
    // "Air Pollution" : 2,
    // "Alcohol use" : 4,
    // "Dust Allergy" : 5,
    // "OccuPational Hazards" : 4,
    // "Genetic Risk" : 3,
    // "chronic Lung Disease" : 2,
    // "Balanced Diet" : 2,
    // "Obesity" : 4,
    // "Smoking" : 3,
    // "Passive Smoker" : 2,
    // "Chest Pain" : 2,
    // "Coughing of Blood" : 4,
    // "Fatigue" : 3,
    // "Weight Loss" : 4,
    // "Shortness of Breath" : 2,
    // "Wheezing" : 2,
    // "Swallowing Difficulty" : 3,
    // "Clubbing of Finger Nails" : 1,
    // "Frequent Cold" : 2,
    // "Dry Cough" : 3,
    // "Snoring" : 4,
    // }) //Low crrct 

    // const output=net.run({
    // "Age" : 35,
    // "Gender" : 2,
    // "Air Pollution" : 4,
    // "Alcohol use" : 5,
    // "Dust Allergy" : 6,
    // "OccuPational Hazards" : 5,
    // "Genetic Risk" : 6,
    // "chronic Lung Disease" : 5,
    // "Balanced Diet" : 5,
    // "Obesity" : 5,
    // "Smoking" : 6,
    // "Passive Smoker" : 6,
    // "Chest Pain" : 6,
    // "Coughing of Blood" : 5,
    // "Fatigue" : 1,
    // "Weight Loss" : 4,
    // "Shortness of Breath" : 3,
    // "Wheezing" : 2,
    // "Swallowing Difficulty" : 4,
    // "Clubbing of Finger Nails" : 6,
    // "Frequent Cold" : 2,
    // "Dry Cough" : 4,
    // "Snoring" : 1
    // }) //medium ccrct


    console.log(output);

    
    res.send(output)
})
