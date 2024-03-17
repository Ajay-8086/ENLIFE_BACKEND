const express = require("express");
require("dotenv").config();
const connectDb = require("./config/config");
const session = require('express-session')
const adminRouter = require("./routes/adminRouter");
const userRouter = require("./routes/userRouter");

//Express app setup
const app = express();
const port = process.env.PORT || 3000;

//Middle ware for data passing and session
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false
}))
//Routes
app.use("/user", userRouter);//user routers

//Database connecting and port listen
connectDb().then(()=>{
    app.listen(port, () => {
        console.log(`server is running on ${port}`);
    });
})
