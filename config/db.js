const mongoose = require("mongoose");
const {DATABASE_URL} = process.env;

exports.connect = () => {
    // Connecting to the database
    mongoose.connect(DATABASE_URL)
        .then(() => {
            console.log("Successfully connected to database");
        })
        .catch((error) => {
            console.log("database connection failed.");
            console.error(error.message);
            process.exit(1);
        });
};