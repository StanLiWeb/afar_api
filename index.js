import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { dbConnect } from './src/utils/utils.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler, notFoundErrorHandler } from './src/middleware/errorHandler.js';
import userRouter from './src/routes/userRoutes.js';
import vendorRouter from './src/routes/vendorRoutes.js';

//load Enciroment variables from .env file
dotenv.config();

//connection to mongodb
dbConnect();

//Initialize express app
const app= express();

//Middlware setup
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'))
app.use(cors());


//Api routes
app.use('/api/user',userRouter);
app.use('/api/vendor',vendorRouter);


//Error handler middleware
app.use(notFoundErrorHandler);
app.use(errorHandler);

//Starting to server
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})