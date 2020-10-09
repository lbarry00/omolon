import express, { Request, Response } from "express";
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');

const loadoutsRouter = require("./routes/loadouts");

const app = express()

const PORT = 8000;
const mongoDbUrl = "mongodb://localhost/omolon"

// establish connection to database
mongoose.connect(mongoDbUrl,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
mongoose.Promise = global.Promise;

// error/success notification
db.on("open", function() {
  console.log("Connected to MongoDB database.");
});
db.on("error", function(err: Error) {
  console.log("Error occurred while connecting to MongoDB database.");
  return console.log(err);
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/loadouts", loadoutsRouter);

app.listen(PORT, () => {
  console.log("Server started listening on port " + PORT)
})
