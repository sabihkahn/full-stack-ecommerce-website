import dotenv from 'dotenv';    
dotenv.config()
import express from 'express';
import cors from 'cors';
import ConnectedDB from './config/db.js';
import userRoute from './routes/userRoute.js'
import catogeryRoute from './routes/catogeryRoute.js'
import productRoute from './routes/productRoutes.js'
ConnectedDB()
const app  = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use('/',userRoute)
app.use('/',catogeryRoute)
app.use('/',productRoute)


app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(3000,()=>{
    console.log('server is running 🤑')
})

