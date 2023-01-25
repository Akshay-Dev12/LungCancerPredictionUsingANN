import {
    infoUser,registerUser,login,loginReq,testDb
} from '../controllers/controllers'

const routes=(app)=>{   

 app.route('/infoUser')  
     .get(loginReq,(req,res)=>{
        res.send("Pass the opening page")
     })
     .post(loginReq,infoUser)

app.route('/register')
    .get((req,res)=>{
        res.send("Pass the user registration page")
    })     
    .post(registerUser)

app.route('/login')
    .get((req,res)=>{
        res.send("Pass the login page")
    })    
    .post(login)

app.route('/test')
   .get(loginReq,((req,res)=>{
    res.send("Verified")
   }))    

app.route('/testDb')
    .get(testDb)   
}



export default routes;