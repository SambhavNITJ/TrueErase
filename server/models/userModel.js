import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    clerkId : {type : String, required : true, unique : true},
    email : {type : String, required : true, unique : true},
    photo : {type : String , required : true},
    firstname : {type : String}, 
    lastname : {tyep : String}, 
    creditBalance : {type : Number, defualt : 10}
});


const userModel = mongoose.model("userModel", userSchema);

export default userModel;
