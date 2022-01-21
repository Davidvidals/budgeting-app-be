const express = require("express");
const budgetRoutes = express.Router();
const budgetArr = require("../models/Transactions.js")

//index (GET)
budgetRoutes.get('/',(req,res)=>{
    res.json(budgetArr)
});

//show (GET)
budgetRoutes.get("/:index", (req, res)=>{
    const { index } = req.params;
    if(budgetArr[index]){
        res.json(budgetArr[index]);
    } else {
        res.status(404).json({error: "Not found"});
    }
});

//create (POST)
budgetRoutes.post("/", (req, res)=>{
    budgetArr.push(req.body);
    res.json(budgetArr[budgetArr.length-1]);
})

//delete (DELETE)
budgetRoutes.delete("/:index", (req, res)=>{
    const { index } = req.params;
    if(budgetArr[index]){
        let remove = budgetArr.splice(index, 1);
        res.json(remove[0]);
    } else {
        res.status(404).json({error: "Not found"});
    }
})

//update (PUT)

module.exports = budgetRoutes;