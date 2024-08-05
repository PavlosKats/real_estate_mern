import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

//create user signup and hash the password with bcrypt
export const signup = async(req, res, next) => {
    const {username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User ({username, email, password:hashedPassword})
    try {
        await newUser.save();
        res.status(201).json('user created successfully')
    } catch (error) {
        next(error)
    }
}

//create user sign in 
export const signin = async(req, res, next) => {
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({ email });
        if(!validUser){
            return next(errorHandler(404, "User not found."))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
            return next(errorHandler(401, "Wrong Credentials"));
        }
        //here create cookie with jsonwebtoken
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
        //destructure the user object and keep the ...rest, so the password is filtered out.
        //password: pass naming is because the actual password is destructured at the top,name is taken.
        //_doc is the object containing the validUser in mongoDB
        const {password: pass, ...rest } = validUser._doc;
        res
        .cookie('access_token', token, {
            httpOnly:true,
            secure:true,
            sameSite:'None',})
        .status(200)
        //pass the ...rest and not the actual user password
        .json(rest);
    } catch (error) {
        next(error);
    }
}