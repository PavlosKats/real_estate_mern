import mongoose from "mongoose";

//create the user schema here
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    }
},
    //get time and date when creating users with timestamps: true
    {timestamps: true})


const User = mongoose.model('User', userSchema);

export default User;