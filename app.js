const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const adminRouter = require("./routes/adminRouter");
const userRouter = require("./routes/userRouter");

const connectDb = require("./config/config");
connectDb();
console.log(connectDb);

app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.listen(port, () => {
    console.log(`server is running on ${port}`);
});
