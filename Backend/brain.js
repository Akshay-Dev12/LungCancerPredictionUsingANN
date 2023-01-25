var brain=require("brain.js")

var ObjectId = require('mongodb').ObjectId;
const config = {
    binaryThresh: 0.5, // ¯\_(ツ)_/¯
    hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid' // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh']
  };
  const net = new brain.NeuralNetwork(config);

  //convert to your suitaable format then only supply to training function...


net.train([
    /* 1 */
{
   input:{
    "index" : 0,
    "Age" : 33,
    "Gender" : 1,
    "Air Pollution" : 2,
    "Alcohol use" : 4,
    "Dust Allergy" : 5,
    "OccuPational Hazards" : 4,
    "Genetic Risk" : 3,
    "chronic Lung Disease" : 2,
    "Balanced Diet" : 2,
    "Obesity" : 4,
    "Smoking" : 3,
    "Passive Smoker" : 2,
    "Chest Pain" : 2,
    "Coughing of Blood" : 4,
    "Fatigue" : 3,
    "Weight Loss" : 4,
    "Shortness of Breath" : 2,
    "Wheezing" : 2,
    "Swallowing Difficulty" : 3,
    "Clubbing of Finger Nails" : 1,
    "Frequent Cold" : 2,
    "Dry Cough" : 3,
    "Snoring" : 4,

   },
   output:{
    "Level" : 0
   }
    
},

/* 2 */
{
    input:{
    "index" : 1,
    "Age" : 17,
    "Gender" : 1,
    "Air Pollution" : 3,
    "Alcohol use" : 1,
    "Dust Allergy" : 5,
    "OccuPational Hazards" : 3,
    "Genetic Risk" : 4,
    "chronic Lung Disease" : 2,
    "Balanced Diet" : 2,
    "Obesity" : 2,
    "Smoking" : 2,
    "Passive Smoker" : 4,
    "Chest Pain" : 2,
    "Coughing of Blood" : 3,
    "Fatigue" : 1,
    "Weight Loss" : 3,
    "Shortness of Breath" : 7,
    "Wheezing" : 8,
    "Swallowing Difficulty" : 6,
    "Clubbing of Finger Nails" : 2,
    "Frequent Cold" : 1,
    "Dry Cough" : 7,
    "Snoring" : 2,
    },
    output:{
      "Level" : 1
    }
    
},

/* 3 */
{
    input:{
    "index" : 2,
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
    },
    output:{
      "Level" : 2

    } 
},

/* 4 */
{
    input:{
    "index" : 3,
    "Age" : 37,
    "Gender" : 1,
    "Air Pollution" : 7,
    "Alcohol use" : 7,
    "Dust Allergy" : 7,
    "OccuPational Hazards" : 7,
    "Genetic Risk" : 6,
    "chronic Lung Disease" : 7,
    "Balanced Diet" : 7,
    "Obesity" : 7,
    "Smoking" : 7,
    "Passive Smoker" : 7,
    "Chest Pain" : 7,
    "Coughing of Blood" : 8,
    "Fatigue" : 4,
    "Weight Loss" : 2,
    "Shortness of Breath" : 3,
    "Wheezing" : 1,
    "Swallowing Difficulty" : 4,
    "Clubbing of Finger Nails" : 5,
    "Frequent Cold" : 6,
    "Dry Cough" : 7,
    "Snoring" : 5,
    },
    output:{
      "Level" : 2
    }
},

/* 5 */
{
    input:{
    "index" : 4,
    "Age" : 46,
    "Gender" : 1,
    "Air Pollution" : 6,
    "Alcohol use" : 8,
    "Dust Allergy" : 7,
    "OccuPational Hazards" : 7,
    "Genetic Risk" : 7,
    "chronic Lung Disease" : 6,
    "Balanced Diet" : 7,
    "Obesity" : 7,
    "Smoking" : 8,
    "Passive Smoker" : 7,
    "Chest Pain" : 7,
    "Coughing of Blood" : 9,
    "Fatigue" : 3,
    "Weight Loss" : 2,
    "Shortness of Breath" : 4,
    "Wheezing" : 1,
    "Swallowing Difficulty" : 4,
    "Clubbing of Finger Nails" : 2,
    "Frequent Cold" : 4,
    "Dry Cough" : 2,
    "Snoring" : 3,

    },
    output:{
       "Level" : 2
    }  
}

])

const output =net.run({
  "index" : 0,
    "Age" : 33,
    "Gender" : 1,
    "Air Pollution" : 2,
    "Alcohol use" : 4,
    "Dust Allergy" : 5,
    "OccuPational Hazards" : 4,
    "Genetic Risk" : 3,
    "chronic Lung Disease" : 2,
    "Balanced Diet" : 2,
    "Obesity" : 4,
    "Smoking" : 3,
    "Passive Smoker" : 2,
    "Chest Pain" : 2,
    "Coughing of Blood" : 4,
    "Fatigue" : 3,
    "Weight Loss" : 4,
    "Shortness of Breath" : 2,
    "Wheezing" : 2,
    "Swallowing Difficulty" : 3,
    "Clubbing of Finger Nails" : 1,
    "Frequent Cold" : 2,
    "Dry Cough" : 3,
    "Snoring" : 4,
})

console.log(output);