
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
            newUser.save(async(err,userBody)=>{
                if(err){
                    console.log(err)
                    res.send(err)
                }
                    else{

                        let outputObj={
                            "Age" : userBody.Age,
                            "Gender" : userBody.Gender,
                            "Air Pollution" : userBody["Air Pollution"],
                            "Alcohol use" : userBody["Alcohol use"],
                            "Dust Allergy" : userBody["Dust Allergy"],
                            "OccuPational Hazards" : userBody["OccuPational Hazards"],
                            "Genetic Risk" : userBody["Genetic Risk"],
                            "chronic Lung Disease" : userBody["chronic Lung Disease"],
                            "Balanced Diet" : userBody["Balanced Diet"],
                            "Obesity" : userBody.Obesity,
                            "Smoking" : userBody.Smoking,
                            "Passive Smoker" : userBody["Passive Smoker"],
                            "Chest Pain" : userBody["Chest Pain"],
                            "Coughing of Blood" : userBody["Coughing of Blood"],
                            "Fatigue" : userBody.Fatigue,
                            "Weight Loss" : userBody["Weight Loss"],
                            "Shortness of Breath" : userBody["Shortness of Breath"],
                            "Wheezing" : userBody.Wheezing,
                            "Swallowing Difficulty" : userBody["Swallowing Difficulty"],
                            "Clubbing of Finger Nails" : userBody["Clubbing of Finger Nails"],
                            "Frequent Cold" : userBody["Frequent Cold"],
                            "Dry Cough" : userBody["Dry Cough"],
                            "Snoring" : userBody.Snoring
                            }
                            // console.log(outputObj)

                        let allData=await  personsInfos.aggregate([
                            {
                                $project:{
                                    _id:0,
                                    input:{
                                    Age:"$Age",
                                    Gender:"$Gender",
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
                                                  { "case": { "$eq": [ "$Level", "High" ] }, "then": 1},
                                                  { "case": { "$eq": [ "$Level", "Medium" ] }, "then": .5},
                                                  { "case": { "$eq": [ "$Level", "Low" ] }, "then": 0}
                                                ],
                                                "default": 1
                                              }
                                           }
                    
                                    }
                    
                                }
                            },
                            {$limit:200}
                        ])
                    
                        net.train(allData);

                        const output=net.run(outputObj)

                        let resp={
                            output:output,
                            userDetails:userBody
                        }

                        res.send(resp)


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
                Age:"$Age",
                Gender:"$Gender",
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
                              { "case": { "$eq": [ "$Level", "High" ] }, "then": 1},
                              { "case": { "$eq": [ "$Level", "Medium" ] }, "then": .5},
                              { "case": { "$eq": [ "$Level", "Low" ] }, "then": 0}
                            ],
                            "default": 1
                          }
                       }

                }

            }
        },
        {$limit:200}
    ])

    net.train(allData);

    //Test Case Sample Ouputs

    // const output =net.run({
    //     "Age" : 33,
    //     "Gender" : 1,
    //     "Air Pollution" : 2,
    //     "Alcohol use" : 4,
    //     "Dust Allergy" : 5,
    //     "OccuPational Hazards" : 4,
    //     "Genetic Risk" : 3,
    //     "chronic Lung Disease" : 2,
    //     "Balanced Diet" : 2,
    //     "Obesity" : 4,
    //     "Smoking" : 3,
    //     "Passive Smoker" : 2,
    //     "Chest Pain" : 2,
    //     "Coughing of Blood" : 4,
    //     "Fatigue" : 3,
    //     "Weight Loss" : 4,
    //     "Shortness of Breath" : 2,
    //     "Wheezing" : 2,
    //     "Swallowing Difficulty" : 3,
    //     "Clubbing of Finger Nails" : 1,
    //     "Frequent Cold" : 2,
    //     "Dry Cough" : 3,
    //     "Snoring" : 4,
    // }) //Low

   
    
    const output=net.run({
        "index" : 2,
        "Patient Id" : "P100",
        "Age" : 35,
        "Gender" : 1,
        "Air Pollution" : 4,
        "Alcohol use" : 5,
        "Dust Allergy" : 6,
        "OccuPational Hazards" : 5,
        "Genetic Risk" : 5,
        "chronic Lung Disease" : 4,
        "Balanced Diet" : 6,
        "Obesity" : 7,
        "Smoking" : 2,
        "Passive Smoker" : 3,
        "Chest Pain" : 4,
        "Coughing of Blood" : 8,
        "Fatigue" : 8,
        "Weight Loss" : 7,
        "Shortness of Breath" : 9,
        "Wheezing" : 2,
        "Swallowing Difficulty" : 1,
        "Clubbing of Finger Nails" : 4,
        "Frequent Cold" : 6,
        "Dry Cough" : 7,
        "Snoring" : 2,
    }) //High crrct 

    // const output=net.run({
    //     "Age" : 17,
    //     "Gender" : 1,
    //     "Air Pollution" : 3,
    //     "Alcohol use" : 1,
    //     "Dust Allergy" : 5,
    //     "OccuPational Hazards" : 3,
    //     "Genetic Risk" : 4,
    //     "chronic Lung Disease" : 2,
    //     "Balanced Diet" : 2,
    //     "Obesity" : 2,
    //     "Smoking" : 2,
    //     "Passive Smoker" : 4,
    //     "Chest Pain" : 2,
    //     "Coughing of Blood" : 3,
    //     "Fatigue" : 1,
    //     "Weight Loss" : 3,
    //     "Shortness of Breath" : 7,
    //     "Wheezing" : 8,
    //     "Swallowing Difficulty" : 6,
    //     "Clubbing of Finger Nails" : 2,
    //     "Frequent Cold" : 1,
    //     "Dry Cough" : 7,
    //     "Snoring" : 2,
    // })  //medium


    console.log(output);

    
    res.send(output)
})
