const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 3000;

// app.use(
//   cors({
//     origin: "http://localhost:5173", // Replace with your frontend's origin
//     methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
//     credentials: true, // Allow cookies if needed
//   })
// );

app.use(cors());
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
const reviewsCollection = client.db("innivixdb").collection("reviews");

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
          res.send(user);
        } else {
          res.send({ message: "User not found" });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    app.get("/users", async (req, res) => {
      try {
        const result = await userCollection.find().toArray();
        res.status(200).json(result);
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Failed to fetch users" });
      }
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }
      const result = await userCollection.insertOne(user);
      res.status(201).json(result);
    });
  } catch (error) {
    console.log(error.name, error.message);
  }

  app.delete("/users/:userId", verifyToken, async (req, res) => {
    const userId = req.params.userId;
    const query = { _id: new ObjectId(userId) };
    const result = await userCollection.deleteOne(query);
    res.send(result);
  });

  //Make Seller related API

  app.patch("/users/makeseller/:userId", async (req, res) => {
    const userId = req.params.userId;
    const query = { _id: new ObjectId(userId) };
    const updatedDoc = {
      $set: {
        role: "seller",
        status: "approved",
      },
    };
    const result = await userCollection.updateOne(query, updatedDoc);
    res.send(result);
  });
  app.patch("/users/makebuyer/:userId", async (req, res) => {
    const userId = req.params.userId;
    const query = { _id: new ObjectId(userId) };
    const updatedDoc = {
      $set: {
        role: "buyer",
        status: "rejected",
      },
    };
    const result = await userCollection.updateOne(query, updatedDoc);
    res.send(result);
  });
  app.patch("/dashboard/update-user/:userId", async (req, res) => {
    const userId = req.params.userId;
    const data = req.body;
    const query = { _id: new ObjectId(userId) };
    const updatedDoc = {
      $set: {
        name: data.name,
        photoURL: data.photoURL,
        role: data.role,
        status: data.status,
      },
    };
    const result = await userCollection.updateOne(query, updatedDoc);
    res.send(result);
  });

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

app.delete("/delete-produce/:uId", async (req, res) => {
  const uId = req.params.uId;
  const query = { _id: new ObjectId(uId) };
  const result = await productCollection.deleteOne(query);
  res.send(result);
});

// app.get("/all-products-posted-by-seller", async (req, res) => {
//   const userEmail = req.params.email;
//   const query = { email: userEmail };
//   const products = await productCollection.find(query).toArray();
//   res.send(products);
// });

app.get("/all-products-posted-by-seller", async (req, res) => {
  try {
    const userEmail = req.query.email; // Corrected to query parameters
    if (!userEmail) {
      return res.status(400).send({ message: "Email is required" });
    }
    const query = { email: userEmail };
    const products = await productCollection.find(query).toArray();
    res.send(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send({ message: "Failed to fetch products" });
  }
});

app.patch("/wishlist/add", async (req, res) => {
  const { productId, userEmail } = req.body;
  const result = await userCollection.updateOne(
    { email: userEmail },
    { $addToSet: { wishlist: new ObjectId(String(productId)) } }
  );
  res.send(result);
});

app.patch("/wishlist/remove", verifyToken, async (req, res) => {
  const { productId, userEmail } = req.body;
  const result = await userCollection.updateOne(
    { email: userEmail },
    { $pull: { wishlist: new ObjectId(String(productId)) } }
  );
  res.send(result);
});

// app.get("/wishlist/:userId", verifyToken, async (req, res) => {
//   const userId = req.params.userId;
//   const user = await userCollection.findOne({
//     id: new ObjectId(String(userId)),
//   });
//   if (!user) {
//     return res.send({ message: "User not found" });
//   }
//   const wishlist = await productCollection
//     .find({ _id: { $in: user.wishlist } })
//     .toArray();
//   res.send(wishlist);
// });

app.get("/wishlist/:userId", verifyToken, async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userCollection.findOne({
      _id: new ObjectId(userId),
    });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const wishlistItems = await productCollection
      .find({ _id: { $in: user.wishlist.map((id) => new ObjectId(id)) } })
      .toArray();

    res.send(wishlistItems);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

//Review related API
app.post("/add-review", verifyToken, async (req, res) => {
  const data = req.body;
  const result = await reviewsCollection.insertOne(data);
  res.send(result);
});
app.get("/all-reviews", async (req, res) => {
  const result = await reviewsCollection.find().toArray();
  res.send(result);
});

dbConnect();

app.get("/", (req, res) => {
  res.send("Innovix server is running");
});

app.listen(port, () => {
  console.log(`Innovix server is running on port ${port}`);
});
