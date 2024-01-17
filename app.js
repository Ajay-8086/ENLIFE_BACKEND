const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

const connectDb = require("./config/config");
connectDb();
console.log(connectDb);

app.listen(port, () => {
    console.log(`server is running on ${port}`);
});
