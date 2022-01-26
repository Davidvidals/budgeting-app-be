const express = require("express");
const budgetRoutes = express.Router()
const Transactions = require("../models/Transactions.js")

//index (GET)
budgetRoutes.get('/',(req,res)=>{
    res.json(Transactions)
});

//show (GET)
budgetRoutes.get("/:index", (req, res)=>{
    const { index } = req.params;
    if(Transactions[index]){
        res.json(Transactions[index]);
    } else {
        res.status(404).json({error: "Not found"});
    }
});

//create (POST)
budgetRoutes.post("/", (req, res)=>{
    Transactions.push(req.body);
    res.json(Transactions[Transactions.length-1]);
})

//delete (DELETE)
budgetRoutes.delete("/:index", (req, res)=>{
    const { index } = req.params;
    if(Transactions[index]){
        let remove = Transactions.splice(index, 1);
        res.json(remove[0]);
    } else {
        res.status(404).json({error: "Not found"});
    }
})

//update (PUT)
budgetRoutes.put("/:index", (req, res)=>{
    let { index } = req.params;

    if(!Transactions[index]){
        res.status(404).json({
            error: "Not found"
        })
        return;
    }

    let { item_name, amount, date, from, category } = req.body;
    if(item_name && amount && date && from !== undefined && category){
        Transactions[index] = {
            item_name, amount, date, from, category
        };
        res.json(Transactions[index]);
    } else {
        res.status(422).json({
            error: "Please provide all fields"
        })
    }
})

module.exports = budgetRoutes;