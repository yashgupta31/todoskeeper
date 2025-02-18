const express= require("express");
const app= express();
const dotenv= require('dotenv');
dotenv.config();
const connection= require('./config/db')
const PORT= process.env.PORT;

app.get('/', (req, res)=>{
    res.send('hone todo')
})

app.listen(PORT, async()=>{
    try {
        await connection;
        console.log(`Server is running on port- ${PORT}`)
    } catch (error) {
        console.log(error)
    }
})