require("dotenv").config();
const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

const { verifyJwt } = require("./src/middleware/jwt.middleware");

//mongoose
require("./src/config/mongo");

//middleware
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,            //access-control-allow-credentials:true
//     optionSuccessStatus: 200
// }))
// if (process.env.NODE_ENV === "production") {
app.use(express.static("client/build"));
// }

//routes
app.use("/user", require("./src/routes/user.routes"));
app.use("/api", verifyJwt, require("./src/routes/todo.routes"));

app.get("*", (req, res) => {
    res.redirect("/");
})

//error
app.use((req, res, next) => {
    res.status(404).send("404 page not found")
});

app.use((err, req, res, next) => {
    console.log("************* error occured ", err);
    res.status(500).send("Oops.. some server error occured");
})

//listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server running at port ", PORT))