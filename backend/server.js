const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());

mongoose
  .connect("mongodb+srv://admin:2004@cluster0.ufwwgdu.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

const ProductSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  image: String,
  description: String
});

const Product = mongoose.model("Product", ProductSchema);

const OrderSchema = new mongoose.Schema({
  productTitle: String,
  productId: String,
  price: Number,
  username: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: "paid"
  }
});

const Order = mongoose.model("Order", OrderSchema);

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    default: "user" 
  }
});

const User = mongoose.model("User", UserSchema);

app.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  const newUser = new User({ username, password, role });
  await newUser.save();

  res.json({ message: "User registered" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });

  if (!user) {
    return res.json({ success: false, message: "Invalid credentials" });
  }

  res.json({
    success: true,
    username: user.username,
    role: user.role
  });
});

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
});

app.post("/add-product", async (req, res) => {
  const { title, price, author, image, description } = req.body;

  const newProduct = new Product({
    title,
    price,
    author,
    image,
    description
  });

  await newProduct.save();

  res.json({ message: "Product added" });
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.json({ message: "Product deleted" });
});

app.post("/orders", async (req, res) => {
  const { productId, productTitle, price, username } = req.body;

  const newOrder = new Order({
    productId,
    productTitle,
    price,
    username
  });

  await newOrder.save();

  res.json({ message: "Order created" });
});

app.get("/orders", async (req, res) => {
  const { username, role } = req.query;

  if (role === "admin") {
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.json(orders);
  }

  const orders = await Order.find({ username }).sort({ createdAt: -1 });
  res.json(orders);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
