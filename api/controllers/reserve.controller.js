import Reserve from "../models/reservatie.model.js"
import Stripe from "stripe"
import createError from "../functions/createError.js"

export const intent = async (req,res,next) => {
    try{
        const stripe = new Stripe(
            process.env.STRIPE_KEY
        )
        const calculatePrice = (child, adult, days) => {
            const childPrice =  days * 35 * child;
            const adultPrice = days * 45 * adult;

            return childPrice + adultPrice
        }
        // console.log("dates in controller:" , req.body.dates)    
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculatePrice(
                req.body.children,
                req.body.adults, 
                req.body.days) * 100,
            currency: "eur",
            automatic_payment_methods:{
                enabled: true,
            }
        });
        const newReserve = new Reserve({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            adults: req.body.adults,
            Children: req.body.children,
            ChildrenAge:req.body.childrenAge,
            dates: req.body.dates,
            price:req.body.price,
            desc: req.body.desc,
            payment_intent:paymentIntent.id,
        })
      
        await newReserve.save()
     
        res.status(200).send({clientSecret: paymentIntent.client_secret,})
      
    }catch(err){
        next(err)
    }
}
export const getReserves = async (req,res,next) => {
    try{
   
        if(!req.isGert) return next(createError(403, "You are not Gertje"))

        const reserves = await Reserve.find({isCompleted: true})
        .select('-unavailableDates -payment_intent -updatedAt').sort(({createdAt: -1}))

        res.status(200).send(reserves)
    }catch(err){
        next(err)
    }
}
export const getReserve = async (req,res,next) => {
    try{
        if(!req.isGert) return next(createError(403, "You are not Gertje"))

        const reserve = await Reserve.find({
            _id: req.params.id
        })
        res.status(200).send(reserve)
    }catch(err){
        next(err)
    }
}
export const getUnavailables = async (req,res,next) =>{ 
    try{
        const reserve = await Reserve.findOne().sort({'created_at' : 1}).select('unavailableDates -_id')

        res.status(200).send(reserve)
    }catch(err){
        next(err)
    }
}
export const setUnavailables = async (req,res,next) =>{
    try{       
        const reserve = await Reserve.findOneAndUpdate(
            {'created_at' : 1},
            {$push: {"unavailableDates" :req.body.dates}} )
            console.log("controller dates:" , req.body.dates)
        res.status(200).send(reserve)
    }catch(err){
        next(err)
    }
}
export const unSetUnavailables = async (req,res,next) =>{
    try{
    if(!req.isGert) return next(createError(403, "You are not Gertje"))
        const reserve = await Reserve.findOneAndUpdate(
            {'created_at' : 1},
            {$pull: {"unavailableDates" : {$in: req.body.dates}}})
        res.status(200).send(reserve)
    }catch(err){
        next(err)
    }
}
export const confirm = async (req,res,next) => {
    try{
        //update unavailables
        const reserve = await Reserve.findOneAndUpdate(
            {payment_intent:req.body.payment_intent,} , 
            {$set:{ isCompleted:true,}})
        const dates = await Reserve.findOneAndUpdate(
            {'created_at' : 1}, 
            {$push: {"unavailableDates": req.body.newDates}})
        res.status(200).send(reserve)
    }catch(err){
        next(err)
    }
}
export const deleteReserve = async (req,res,next) => {
    try{
        if(!req.isGert) return next(createError(403, "You are not Gertje"))
        
        const reserve = await Reserve.findByIdAndDelete({
            _id: req.params.id
        })
        res.status(200).send(reserve)

    }catch(err){
        next(err)
    }
}
