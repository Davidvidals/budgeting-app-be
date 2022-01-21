const express = require("express");
const budgetController = require("./controllers/budgetController.js");
const app = express();

const cors= require("cors");
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Welcome to our Budgeting App')
})

app.use('/Transactions', budgetController)

app.get('*',(req,res)=>{
    res.status(404).json({error: "Page not found"})
})

module.exports =app;