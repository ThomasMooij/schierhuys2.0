import User from "../models/users.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import createError from "../functions/createError.js"

export const login = async (req,res,next) =>{
    try{
        //check username
        const user = await User.findOne({guestname: req.body.guestname});
        if(!user) return res.status(404).send("username or password incorrect")
        // check password
        const isCorrect = bcrypt.compareSync(req.body.password, user.password)
        if(!isCorrect) return res.status(404).send("username or password incorrect")
        //create cookie on login
        const token = jwt.sign({
            id: user._id,
            isGert: user.isGert,
        }, process.env.JWT)
        // get password out off user object so it is not send on completion
        const {password, isGert, ...info} = user._doc 
        //pass cookie up the chain
        res.cookie("accessToken", token , {
            httpOnly:true
        })
        res.status(200).send({details:{...info}, isGert})
    }catch(err){
        console.log(err)
    }
}
export const register = async (req,res,next) =>{
    try{  
        // only admin user can register 
        if(!req.isGert) return next(createError(403, "You are not gertje"))
        // encrypt sent password   
        const hash = bcrypt.hashSync(req.body.password, 5)
        // pass sent data to variable, set sent password to hashed password
        const newUser = new User({
           ...req.body,
           password:hash,
        })
        await newUser.save()
        res.status(200).send("user created")

    }catch(err){
        next(err)
    }
}
export const logout = async (req,res,next) =>{
    try{
        res.clearCookie("accessToken" , {
            sameSite:"none",
            secure: true,
        }).status(200).send("user has been logged out")
    }catch(err){
        res.status(500).send("something went wrong")
    }
}