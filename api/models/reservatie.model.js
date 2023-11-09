import mongoose from 'mongoose';
const { Schema } = mongoose;

const ReservatieSchema = new Schema({

    firstname:{
        type:String,
        required: true,
    },
    lastname:{
        type:String,
        required: true,
    },
    email:{
        type: String,
        required: true
    },
    adults:{
        type:Number,
        required: true,
    },
    Children:{
        type: Number,
      },
    ChildrenAge: {
        type: [String]
    },
    dates: {
        type:[Date],
    },
    unavailableDates:{
        type:[String],
    },
    price:{
        type:Number,
        required: true,
    },
    desc:{
        type:String,
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    payment_intent:{
        type:String,
        required: true,
    },
  }, {
    timestamps:true
  }
);

export default mongoose.model("Reservatie", ReservatieSchema)