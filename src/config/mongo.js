const mongoose = require("mongoose");

// mongoose.connect(process.env.MONGODB_URI_TEST)
mongoose.connect(process.env.MONGODB_URI_LIVE)

mongoose.connection.once("open", () => {
    console.log("mongo connection successfull");
}).on("error", (err) => {
    console.log("mongo connection failed ", err);
})

module.exports = mongoose;