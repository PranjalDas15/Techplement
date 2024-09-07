const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

// Test Route
const test = (req, res) => {
    return res.status(200).json({ message: 'Test is working' });
}

// Registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validating input
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }
        if (!password || password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }

        // Check if email already exists
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({ error: 'Email is already taken' });
        }
        const hashedPassword = await hashPassword(password);

        // Create new user
        const user = await User.create({ name, email, password: hashedPassword });

        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                name: user.name,
                email: user.email,
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'No user found with this email' });
        }

        // Compare password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        const token = jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Setting cookie
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS in production
            sameSite: 'lax'
        };

        
        res.cookie('token', token, cookieOptions);
        return res.status(200).json(user);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


// Get Profile
const getProfile = (req, res) => {
    const { token } = req.cookies; 
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        res.json({ email: decoded.email, name: decoded.name, _id: decoded.id }); 
    });
};


// Logout
const logoutUser = (req, res) => {
    res.clearCookie('token'); 
    res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser
};
