const express = require("express");
const User = require("../models/User"); // Assuming User is a Mongoose model
const jwt = require("jsonwebtoken");
const zod = require("zod");

const router = express.Router();

// Token generation function
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Request body validation schema using Zod for signup and login
const signupSchema = zod.object({
    username: zod.string().min(1, "Username is required"),
    password: zod.string().min(6, "Password must be at least 6 characters long"),
    class: zod.number().min(1, "Class must be a valid number"),
});

const loginSchema = zod.object({
    username: zod.string().min(1, "Username is required"),
    password: zod.string().min(6, "Password must be at least 6 characters long"),
});

// Signup Route
router.post("/signup", async (req, res) => {
    try {
        // Validate request body using Zod
        const result = signupSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ errors: result.error.errors });
        }

        const { username, password, class: userClass } = result.data;

        // Check if the user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        user = new User({ username, password, class: userClass });
        await user.save();

        // Generate token and set cookie
        const token = generateToken(user._id);
        res.cookie("token", token, { httpOnly: true });

        return res.status(201).json({ token, message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    try {
        // Validate request body using Zod
        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ errors: result.error.errors });
        }

        const { username, password } = result.data;

        // Check if the user exists
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Validate password
        if (!(await user.matchPassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate token and set cookie
        const token = generateToken(user._id);
        res.cookie("token", token, { httpOnly: true });

        return res.json({ token, message: "Logged in successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});


// Logout Route
router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
});

module.exports = router;


//  /signup for signup , /login for login the user, /logout for logging the user out