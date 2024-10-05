const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// Middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Import routes
const userRoutes = require("./routes/user");
const courseRoutes = require("./routes/courseRoutes");
const topicRoutes = require("./routes/topicRoutes");

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error: ", err));

// Use the routes
app.use("/api/users", user);
app.use("/api/courses", courseRoutes);
app.use("/api/topics", topicRoutes);

// Define a basic route
app.get("/", (req, res) => {
    res.send("Server is running");
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
