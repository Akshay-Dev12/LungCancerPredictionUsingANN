import express from'express';
import routes from './src/routes/routes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';


const app=express()
const PORT=2000;

app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())



app.use((req,res,next)=>{
    console.log("JWT")
    console.log(req.headers.authorization)
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1],'RAZORPAY',(err,decode)=>{
            if(err) req.user=undefined
            req.user=decode
            next()
        })
    }else{
        
        req.user=undefined
    }
})

routes(app)




app.listen(PORT,()=>{
    console.log(`Your server is running on port ${PORT}`)
})

mongoose.Promise=global.Promise;
var db = "mongodb://localhost:27017/LungCancer";
mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});


app.use(express.static('public'));
app.use('/images', express.static('images'))






