const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

//connext to mongoode database useing Mongoose
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {

            useNewUrlParser: true,
            useUnifiedTopology: true,
            writeConcern: { w: "majority" },
        })

    }
    catch (error) {
        console.log(`Error in connection ${error}`);
    }
}

module.exports = connectDB;                         
