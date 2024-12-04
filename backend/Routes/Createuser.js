const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt=require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // Corrected import for bcrypt
const jwtSecret="MyNameisVagdeviArvapalliEndtoEnd"

// Route to create a new user with validation
router.post(
    "/createuser",
    [
        // Validation checks
        body('email', 'Please enter a valid email').isEmail(),
        body('name', 'Name must be at least 5 characters long').isLength({ min: 5 }),
        body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, password, email, location } = req.body;

            // Check if all fields are provided
            if (!name || !password || !email || !location) {
                return res.status(400).json({ success: false, message: 'All fields are required' });
            }

            // Check if a user with the same email already exists
            let existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'User with this email already exists' });
            }

            // Hash the password before storing it
            const salt = await bcrypt.genSalt(10);
            const secPassword = await bcrypt.hash(password, salt);

            // Create a new user in the database
            const user = await User.create({
                name,
                password: secPassword,  // Store the hashed password
                email,
                location
            });

            // Send success response
            res.json({ success: true, message: 'User created successfully', user });

        } catch (error) {
            console.error("Error creating user:", error.message);
            res.status(500).json({ success: false, message: 'Error creating user', error: error.message });
        }
    }
);

// Route for user login
router.post(
    "/loginuser",
    [
        body('email', 'Please enter a valid email').isEmail(),
        body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // Check if the email exists in the database
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(401).json({ success: false, message: 'Incorrect email or password' });
            }

            // Compare the provided password with the stored hashed password
            const passwordMatch = await bcrypt.compare(password, userData.password);
            if (!passwordMatch) {
                return res.status(401).json({ success: false, message: 'Incorrect email or password' });
            }

            const data={
                user:{
                    id:userData.id
                }
            }
            const authToken=jwt.sign(data,jwtSecret)

            // If login is successful, send success response
            res.json({ success: true,authToken:authToken });

        } catch (error) {
            console.error("Error logging in user:", error.message);
            res.status(500).json({ success: false, message: 'Error logging in user', error: error.message });
        }
    }
);

module.exports = router;
