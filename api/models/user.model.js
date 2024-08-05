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
    },
    avatar:{
        type: String,
        default:"https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1722729600&semt=sph"
    },
},
    //get time and date when creating users with timestamps: true
    {timestamps: true})


const User = mongoose.model('User', userSchema);

export default User;