import bcrypt from "bcrypt"
import User from "../model/user.model.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const Signup = async (req , res)=>{
    try{

        const {email , name , password} = req.body

        if(!name || !email || !password){
             return res.status(500).json({success : false , message : "all Fields required"})
        }

        const hashedPassword = await bcrypt.hash(password , 10)

        const newUser = new User({email , name , password : hashedPassword})

        await newUser.save()

         return   res.json({
            success : true ,
            message : "Sign up successfully" ,
            newUser
            })

    }catch(err){
       return res.status(500).json({success : false , message : "error in signup"})
       }
}


export const Login = async (req , res)=>{
    try{
            const {email , password} = req.body

            if(!email  || !password) {
                return res.status(500).json({success : false , message : "provide details please"})
            }
            
            const user = await User.findOne({email})

            if(!user){
                return res.status(500).json({success : false , message : "user not found , Signup"})
            }
      
            const comparePass = await bcrypt.compare(password , user.password)

            if(!comparePass){
                return res.status(500).json({success : false , message : "Wrong Password"})
            }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

            res.cookie('userId', user.id, { httpOnly: true });

            res.cookie("accessToken", token , {
                maxAge:  86400000, //24hours       
                httpOnly: true,     
                secure: process.env.NODE_ENV === 'production',
            })

         return   res.json({token})

    }catch(err){
       return res.status(500).json({success : false , message : "error in signup"})
       }
}

