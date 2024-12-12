const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());

//mongoDB

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tuf9wrv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const dbConnect = async () => {
  try {
    client.connect();
    console.log("Database connected Successfully");
  } catch (error) {
    console.log(error.name, error.message);
  }
};

dbConnect();

//API

// JWT related API
app.post("/authentication", async (req, res) => {
  const userEmail = req.body;
  const token = jwt.sign(userEmail, process.env.ACCESS_KEY_TOKEN, {
    expiresIn: process.env.TOKEN_EXPIRATION,
  });
  res.send({ token });
});

app.get("/", (req, res) => {
  res.send("Innovix server is running");
});

app.listen(port, () => {
  console.log(`Innovix server is running on port ${port}`);
});
