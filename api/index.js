import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
// install dotenv to be able to use the .env variable on the backend, then import dotenv and run dotenv.config() to run the server
import dotenv from 'dotenv';
dotenv.config();



mongoose.connect(process.env.MONGO).then(()=>{
    console.log('db is connected');
}).catch((err)=>{
    console.log(err);
})

const app = express();

//this is going to allow json as input from the server
app.use(express.json());

const port = 3000

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);