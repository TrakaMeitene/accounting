const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')

router.use(function (req, res, next) {
    res.header("Content-Type", "application/json");
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    res.header("Access-Control-Allow-Credentials", true)
    next();
  });
  
  router.use(bodyParser.json())

router.get("/", async(req, res)=>{
    try{
        const data = [
            {
                number: "r123",
                date: "12.12.2023",
                client: "Klients SIA",
                cost: 2.000,
                statuss: 1
            },
            {
                number: "r124",
                date: "12.12.2023",
                client: "Klients SIA",
                cost: 2.000,
                statuss: 2
            },
            {
                number: "r125",
                date: "12.12.2023",
                client: "Klients SIA",
                cost: 2.000,
                statuss: 1
            }
        ]
        res.send(data)
    }
    catch(err){

    }
})

    module.exports = router;