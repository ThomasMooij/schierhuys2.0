import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    
    guestname:{
        type: String,
        required:true,
    },
    email: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true
    },
    birthdate:{
        type: String,
        required:true,
    },
    country:{
        type:String, 
        required:true, 
    },
    city:{
        type:String, 
        required:true,
    },
    postalCode:{
        type:String, 
        required:true,
    },
    emailPermission:{
        type:Boolean, 
        required:true,
    },
    termsAgreed:{
        type:Boolean, 
        required:true,
    },
    isGert:{
        type:Boolean,
        default:false
    }

  }, {
    timestamps:true
  }
);

// userSchema.pre('save' , async function(next) {
//     if (this.isModified("password")){
//       this.password = await hash(this.password, 10)
//     }
//     next()
//   })
  
//   userSchema.methods.comparePassword = async function(password){
//     const result = await compare(password, this.password)
//     return result
//   }

export default mongoose.model("Users", userSchema)