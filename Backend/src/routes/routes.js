import {
    infoUser,registerUser,login,loginReq
} from '../controllers/controllers'

const routes=(app)=>{   

 app.route(loginReq,'/infoUser')
     .get((req,res)=>{
        res.send("Pass the opening page")
     })
     .post(infoUser)

app.route('/register')
    .get((req,res)=>{
        res.send("Pass the registration page")
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
     
    
}

export default routes;