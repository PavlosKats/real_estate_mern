import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';

export const test = (req, res) => {
    res.json({message:"yes of course my horse!"})
}

export const updateUser = async (req, res, next) => {
if(req.user.id !== req.params.id) return next(errorHandler(401, "You can only update your account."))
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        //use the $set to protect the process from the information coming from the body.
        const updateUser = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                avatar: req.body.avatar,
            }
        }, {new:true})

        const {password, ...rest} = updateUser._doc

        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
}