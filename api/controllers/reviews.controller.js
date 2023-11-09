import createError from "../functions/createError.js"
import Review from "../models/reviews.model.js"

export const createReview = async (req,res,next)=>{
    const newReview = new Review({
        userId: req.userId,
        desc: req.body.desc,
        star: req.body.star
    })
    try{    
        const review = await Review.findOne({    
            userId: req.userId
        })
        if(review) return next(createError(403, "U mag slechts een recentie achterlaten"))

        const savedReview = await newReview.save()
    }catch(err){
        next(err)
    }
}
export const getReviews = async (req,res,next)=>{

    const query = req.query;

    const filter = {
        ...(query.star && {star: query.star})
    }
    try{
        const reviews = await Review.find(filter).sort({createdAt: -1}).select('-updatedAt')

        res.status(200).send(reviews)
    }catch(err){
        next(err)
    }
}
export const getReview = async (req,res,next)=>{
    try{
        const review = await Review.findOne({
            userId: req.params.id
        }).select('-updatedAt -createdAt')

        res.status(200).send(review)
    }catch(err){
        next(err)
    }
}
export const deleteReview = async (req,res,next)=>{
    try{
        if(!req.isGert) return next(createError(404, "alleen Gert mag gebruikers verwijderen"))
        const review = await Review.findByIdAndDelete(req.params.id)

        res.status(200).send(review)

    }catch(err){
        
    }
}