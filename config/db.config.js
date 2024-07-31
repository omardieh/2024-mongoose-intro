const mongoose = require("mongoose");

async function connectDB() {
  const dbURL = "mongodb://127.0.0.1:27017/mongoose-intro-dev";
  try {
    const response = await mongoose.connect(dbURL);
    console.log(
      `Connected to Mongo! Database name: "${response.connections[0].name}"`
    );
  } catch (error) {
    console.error("Error connecting to mongo", err);
  }
}

module.exports = connectDB;
