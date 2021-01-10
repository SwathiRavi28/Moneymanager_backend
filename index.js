const mongodb = require("mongodb")
const cors = require("cors")
const express = require("express");
const dotenv = require("dotenv")

const mongoClient = mongodb.MongoClient
const objectId = mongodb.ObjectID
const app = express();
let port = process.env.PORT || 5000;
app.listen(port, ()=>console.log(`The app is running on port: ${port}`))
app.use(express.json());
app.use(cors())
dotenv.config()

const url = process.env.DB_URL || "mongodb+srv://Swathi:1u0MiNtS5NWXrUa4@cluster0.ann9b.mongodb.net/<dbname>?retryWrites=true&w=majority";

app.post("/add-income", async(req, res)=>{
    console.log(req.body);
    try{
        let client = await mongoClient.connect(url)
        let db = client.db("money_db")
        let result = await db.collection("income").insertOne(req.body)
        res.status(200).json({
            message :"Income added"
        })
        client.close()
    }
    catch(error){
        res.status(500).json({
            message: "Not able to add"
        })
    }
})

app.post("/add-expense", async(req, res)=>{
    try{
        let client = await mongoClient.connect(url)
        let db = client.db("money_db")
        let result = await db.collection("expense").insertOne(req.body)
        res.status(200).json({
            message :"Expense added"
        })
        client.close()
    }
    catch(error){
        res.status(500).json({
            message: "Not able to add"
        })
    }
})

app.get("/get-income", async(req, res)=>{
    try{
        let client = await mongoClient.connect(url)
        let db = client.db("money_db")
        let result = await db.collection("income").find().toArray()
        let temp=0;
        console.log(result);
        for(let i = 0; i < result.length; i++) {
			temp += parseInt(result[i].price);
		}
        console.log(temp);
        res.status(200).json({
            data : temp,
            message : "Recodrs fetched successfully"
        })
        client.close()
    }
    catch(error){
        res.status(500).json({
            message:"Error while fetching tickets"
        })
    }

})

app.get("/get-expense", async(req, res)=>{
    try{
        let client = await mongoClient.connect(url)
        let db = client.db("money_db")
        let result = await db.collection("expense").find().toArray()
        let temp1=0;
        console.log(result);
        for(let i = 0; i < result.length; i++) {
			temp1 += parseInt(result[i].price);
		}
        res.status(200).json({
            data : temp1,
            message : "Recodrs fetched successfully"
        })
        client.close()
    }
    catch(error){
        res.status(500).json({
            message:"Error while fetching tickets"
        })
    }

})
