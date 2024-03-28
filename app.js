const express = require("express");
require("dotenv").config();
const connectDb = require("./config/config");
const adminRouter = require("./routes/adminRouter");
const userRouter = require("./routes/userRouter");

//Express app setup
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors')

//Middle ware for data passing and session
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));
//Routes
app.use("/user", userRouter); //user routers

//Database connecting and port listen
connectDb().then(() => {
    app.listen(port, () => {
        console.log(`server is running on ${port}`);
    });
});
