const express=require('express');
const cors= require('cors');
require('dotenv').config();

const authRoutes=require('./routes/auth');
const productRoutes=require('./routes/products')

const app=express();

app.use(cors());

app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/products',productRoutes);

const PORT = process.env.PORT || 5001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})

// new code by sameer faisaly