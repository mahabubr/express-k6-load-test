const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Simple API endpoint
app.get("/api/greet", (req, res) => {
  res.json({ message: "Hello, World!" });
});

// POST endpoint example
app.post("/api/greet", (req, res) => {
  const { name } = req.body;
  res.json({ message: `Hello, ${name || "stranger"}!` });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
