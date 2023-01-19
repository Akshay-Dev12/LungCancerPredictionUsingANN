import mongoose from "mongoose";
const Schema=mongoose.Schema;


export const infoUserSchema =new Schema({
  "Patient Id":{
      type:String,
      default:""
  },
  Age:{
    type:Number,
    required:true
  },
  Gender:{
    type:Number,
    required:true
  },
  "Air Pollution":{
    type:Number,
    default:1
  },
  "Alcohol use":{
    type:Number,
    default:1
  },
  "Dust Allergy":{
    type:Number,
    default:1
  },
  "OccuPational Hazards":{
    type:Number,
    default:1
  },
  "Genetic Risk": {
    type:Number,
    default:1
  },
  "chronic Lung Disease":{
    type:Number,
    default:1
  },
  "Balanced Diet":{
    type:Number,
    default:1
  },
  Obesity: {
    type:Number,
    default:1
  },
  Smoking:{
    type:Number,
    default:1
  },
  "Passive Smoker":{
    type:Number,
    default:1
  },
  "Chest Pain":{
    type:Number,
    default:1
  },
  "Coughing of Blood":{
    type:Number,
    default:1
  },
  Fatigue:{
    type:Number,
    default:1
  },
  "Weight Loss":{
    type:Number,
    default:1
  },
  "Shortness of Breath":{
    type:Number,
    default:1
  },
  Wheezing:{
    type:Number,
    default:1
  },
  "Swallowing Difficulty":{
    type:Number,
    default:1
  },
  "Clubbing of Finger Nails":{
    type:Number,
    default:1
  },
  "Frequent Cold": {
    type:Number,
    default:1
  },
  "Dry Cough":{
    type:Number,
    default:1
  },
  Snoring:{
    type:Number,
    default:1
  },
  Level:{
    type:String,
    default:""
  }
},
)

export const userSchema =new Schema({
  name:{
    type:String,
    required:true,
    max:50,
    unique:true
  },
  email:{
    type:String,
    required:true,
    max:50
  },
  password:{
    type:String,
    required:true,
    min:3,
    max:40
  }
},
  {timestamps:true}
)



