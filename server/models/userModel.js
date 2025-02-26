import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    clerkId : {type : String, required : true, unique : true},
    email : {type : String, required : true, unique : true},
    photo : {type : String , required : true},
    firstname : {type : String}, 
    lastname : {tyep : String}, 
    creditBalance : {type : Number, defualt : 10}
});


export const userModel = mongoose.model.user || mongoose.model("user",userSchema)

export default userModel;
