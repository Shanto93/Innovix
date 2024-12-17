const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 3000;
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
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

  app.get("/all-products", async (req, res) => {
    try {
      const { title, sort, category, brand, page = 1, limit = 9 } = req.query;

      const query = {};
      if (title) {
        query.title = { $regex: title, $options: "i" };
      }
      if (category) {
        query.category = { $regex: category, $options: "i" };
      }
      if (brand) {
        query.brand = { $regex: brand, $options: "i" };
      }
      const sortOptions = sort === "asc" ? { price: 1 } : { price: -1 };

      const pageNumber = Number(page);
      const limitNumber = Number(limit);

      const products = await productCollection
        .find(query)
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber)
        .sort(sortOptions)
        .toArray();

      const totalProduct = await productCollection.countDocuments(query);
      const productInfo = await productCollection
        .find(
          {},
          {
            projection: { brand: 1, category: 1 },
          }
        )
        .toArray();

      const brands = [...new Set(productInfo.map((product) => product.brand))];
      const categories = [
        ...new Set(products.map((product) => product.category)),
      ];

      res.json({ products, brands, categories, totalProduct });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.post("/add-product", verifyToken, verifySeller, async (req, res) => {
    const product = req.body;
    const result = await productCollection.insertOne(product);
    res.send(result);
  });
};

app.patch("/wishlist/add", async (req, res) => {
  const { productId, userEmail } = req.body;
  const result = await userCollection.updateOne(
    { email: userEmail },
    { $addToSet: { wishlist: new ObjectId(String(productId)) } }
  );
  res.send(result);
});

app.get("/wishlist/:userId", verifyToken, async (req, res) => {
  const userId = req.params.userId;
  const user = await userCollection.findOne({
    id: new ObjectId(String(userId)),
  });
  if (!user) {
    return res.send({ message: "User not found" });
  }
  const wishlist = await productCollection
    .find({ _id: { $in: user.wishlist } })
    .toArray();
  res.send(wishlist);
});

dbConnect();

app.get("/", (req, res) => {
  res.send("Innovix server is running");
});

app.listen(port, () => {
  console.log(`Innovix server is running on port ${port}`);
});
