const mongoose = require("mongoose");

function dbConnect() {
    mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "enlife",
        })
        .then(() => {
            console.log("connected to mongo db");
        })
        .catch((err) => {
            console.log("error while connecting to mongoDb", err);
        });
}

module.exports = dbConnect;
