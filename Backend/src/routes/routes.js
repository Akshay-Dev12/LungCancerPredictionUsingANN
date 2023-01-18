import {
    registerUser,
} from '../controllers/controllers'

const routes=(app)=>{   

 app.route('/registerUser')
     .get((req,res)=>{
        res.send("Pass the opening page")
     })
     .post(registerUser)
    
}

export default routes;