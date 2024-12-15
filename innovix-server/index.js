const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 3000;

//middleware
app.use(
  cors({
    origin: "http://localhost:5174",
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());

// Token verification
const verifyToken = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.send({ message: "Unauthorized Access" });
  }
  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_KEY_TOKEN, (err, decoded) => {
    if (err) {
      return res.send({ message: "Invalid Token" });
    }
    req.decoded = decoded;
    next();
  });
};

//verify seller
const verifySeller = async (req, res, next) => {
  const userEmail = req.decoded.email;
  const query = { email: userEmail };
  const user = await userCollection.findOne(query);
  if (!user?.role === "seller") {
    return res.send({ message: "Forbidden Access" });
  }
  next();
};

//mongoDB

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tuf9wrv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const userCollection = client.db("innivixdb").collection("users");
const productCollection = client.db("innivixdb").collection("products");

const dbConnect = async () => {
  try {
    client.connect();
    console.log("Database connected Successfully");

    // JWT related API
    app.post("/authentication", async (req, res) => {
      const userEmail = req.body;
      const token = jwt.sign(userEmail, process.env.ACCESS_KEY_TOKEN, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });
      res.send({ token });
    });

    // User related API

    app.get("/users/:email", async (req, res) => {
      try {
        const email = req.params.email;
        const query = { email };
        const user = await userCollection.findOne(query);

        if (user) {
          res.status(200).send(user);
        } else {
          res.status(404).send({ message: "User not found" });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.sendStatus({ message: "User already exists" });
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });
  } catch (error) {
    console.log(error.name, error.message);
  }

  //Products related API

  app.get("/all-product", async (req, res) => {
    const { title, sort, category, brand } = req.query;
    query = {};
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }
    if (sort) {
      const sortoptions = sort === "asc" ? 1 : -1;
    }
    if (category) {
      query.category = { $regex: category, $options: "i" };
    }
    if (brand) {
      query.brand = { $regex: brand, $options: "i" };
    }
    const product = await productCollection
      .find(query)
      .sort({ price: sortoptions })
      .toArray();
    res.json(product);
  });

  app.post("/add-product", verifyToken, verifySeller, async (req, res) => {
    const product = req.body;
    const result = await productCollection.insertOne(product);
    res.send(result);
  });
};

dbConnect();

app.get("/", (req, res) => {
  res.send("Innovix server is running");
});

app.listen(port, () => {
  console.log(`Innovix server is running on port ${port}`);
});
