const path = require("path")
const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv").config();
const connectDB = require('./config/db')
const port = process.env.PORT || 5000;

const app = express();
connectDB()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.use("/api/users", require("./routes/userRoutes"));

app.listen(port, () => console.log(`Server started on port ${port}`));
