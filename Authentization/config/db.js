const mongoose = require('mongoose');

const dbConnection = async () => {
    try {

        await mongoose.connect(process.env.DB_URL);
        console.log("database connection successful!!!");


    } catch (err) {
        console.log("database connection failed!!!", err.message);
    }
}
module.exports = dbConnection;