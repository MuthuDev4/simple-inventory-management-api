const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Middleware to read JSON body
app.use(express.json());

// GET all products
app.get("/getProducts", (req, res) => {
  const products = JSON.parse(fs.readFileSync("products.json", "utf-8"));
  res.json(products);
});

// ADD a new product
app.post("/addProduct", (req, res) => {
  const newProduct = req.body;
  const products = JSON.parse(fs.readFileSync("products.json", "utf-8"));

  products.push(newProduct);

  fs.writeFileSync("products.json", JSON.stringify(products, null, 2));
  res.json({ message: "Product added successfully" });
});

// DELETE a product by productId
app.delete("/deleteProduct", (req, res) => {
  const { productId } = req.body;
  let products = JSON.parse(fs.readFileSync("products.json", "utf-8"));

  products = products.filter(p => p.productId !== productId);

  fs.writeFileSync("products.json", JSON.stringify(products, null, 2));
  res.json({ message: "Product deleted successfully" });
});

// UPDATE product description
app.put("/updateProduct", (req, res) => {
  const { productId, description } = req.body;
  const products = JSON.parse(fs.readFileSync("products.json", "utf-8"));

  const product = products.find(p => p.productId === productId);

  if (product) {
    product.description = description;
    fs.writeFileSync("products.json", JSON.stringify(products, null, 2));
    res.json({ message: "Product updated successfully" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
