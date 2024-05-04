    const express = require("express");
const dotenv = require("dotenv");

const cors = require("cors");
// const morgan = require("morgan");
const connectDB = require("./config/db");
// const product = require('./routes/blog')
const product = require('./router/produtsRoutes')
const user = require('./router/user')
const app = express();

//config
dotenv.config();  //config() is a func. provided by Dotenv file which reads .env file
app.use(cors());
connectDB();   //establish connection with mondoDB(data base)
const PORT = process.env.PORT || 5000

// app.use(morgan("dev"));

app.use(express.json());

app.use('/api/v1',user,product)

app.get("/", (req, res) => {
    res.send("hey baby...")
})

app.listen(PORT, () => {
    console.log(`server is running on ${PORT} in ${process.env.DEV_MODE}`);
});
