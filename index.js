import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv'
import { dbConnection } from './db.js';
import { userRouter } from './Routes/users.js';
import { forgotpasswordrouter } from './Routes/forgot.js';

const app = express()
dotenv.config()
const PORT = process.env.PORT;

app.use(cors())
app.use(express.json())
dbConnection()

app.use("/user" ,userRouter);
app.use("/reset",forgotpasswordrouter)

app.listen(PORT,()=>console.log(`Server started ${PORT}`))

