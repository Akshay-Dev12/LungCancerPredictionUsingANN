
# Lung Cancer Prediction API Using ANN

The help of deep learning software helps to predict the lung cancer level.




## Main Technologies Used

- Node.js | Express.js
- MongoDB
- Brain.js
- JWT Authentication



## Run Locally

Clone the project

```bash
  git clone git@github.com:Akshyay-Dev/LungCancerPredictionUsingANN.git
```

Go to the project directory

```bash
  cd Backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm  start
```
.babelrc setup

```bash
  {
    "presets":[
        "env",
        "stage-0"
    ]

}
```

Database connection & Dataset Details.
```bash
  
 If you are using a local MongoDB server then add dataset (You get the proper data from kaggle website(Search lung cancer prediction ).Convert to NOSQL model )

Or if you using any mongo cloud server then create a collection add the required secrets in dotenv file and connect, Data addiction is similar






```



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`SECRET_KEY`



## Appendix

The term "Artificial Neural Network" is derived from Biological neural networks that develop the structure of a human brain. Similar to the human brain that has neurons interconnected to one another, artificial neural networks also have neurons that are interconnected to one another in various layers of the networks. These neurons are known as nodes.

Training the data for ANN Network

Back-propagation algorithms are used to train the Deep ANN using Kaggle Datasets

Input Data Format

{
    "_id" : ObjectId("63c7d1e88f397d16c99f4b61"),
    "index" : 0,
    "Patient Id" : "P1",
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
    "Level" : "Low"
}

Before Passing to the hidden network, We need to restructure as

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
    
}

// Here the ouput need to convert to Number type, Because we supply N set integer to the Hdden layers

Hidden layer uses sigmoid activation function to calculate the ouput.

Every time new data comes its automatically goes to training network.

Output Structure

{
    "output": {
        "Level": 0.4263635575771332
    },
    "userDetails": {
        "Patient Id": "",
        "Age": 32,
        "Gender": 1,
        "Air Pollution": 1,
        "Alcohol use": 1,
        "Dust Allergy": 1,
        "OccuPational Hazards": 1,
        "Genetic Risk": 1,
        "chronic Lung Disease": 1,
        "Balanced Diet": 1,
        "Obesity": 7,
        "Smoking": 2,
        "Passive Smoker": 1,
        "Chest Pain": 1,
        "Coughing of Blood": 1,
        "Fatigue": 1,
        "Weight Loss": 1,
        "Shortness of Breath": 1,
        "Wheezing": 1,
        "Swallowing Difficulty": 1,
        "Clubbing of Finger Nails": 1,
        "Frequent Cold": 1,
        "Dry Cough": 1,
        "Snoring": 2,
        "Level": "",
        "_id": "63d3638e0e6f2fa7d41e6732",
        "__v": 0
    }
}

By using some flag we can analyse the Level in frontend

0-0.3 ~ Low

0.4-.68 - Medium

.7 - High 

