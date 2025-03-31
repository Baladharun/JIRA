const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require("./route/AuthRoutes.js")
const projectRoutes = require("./route/projectRoutes.js")
dotenv.config();

const app = express();
const port = process.env.PORT;
const databaseURL = process.env.DATABASE_URL;

app.use(cors({
    origin:process.env.ORIGIN,
    methods:["GET","PUT","POST","PATCH","DELETE"],
    credentials:true
}));   
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/project",projectRoutes);
mongoose.connect(databaseURL).then(()=>{console.log('Database connection successfull')})
app.listen(process.env.PORT,()=>{
    console.log(`Server is listening at port ${port}`);    
});
