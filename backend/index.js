const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const authRoutes = require('./routes/authRoutes');
const quoteRoutes = require('./routes/quoteRoutes');
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser')

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));

// Database connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Database Connected'))
    .catch(err => console.log('Database not connected', err));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', require('./routes/authRoutes'));
app.use('/api', require('./routes/quoteRoutes'));

const port = process.env.ROUTE || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));