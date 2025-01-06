const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const session = require('express-session');

dotenv.config();
connectDB();
const app = express();

// Middleware session
app.use(session({
    secret: process.env.JWT_SECRET || 'jsosjdihdiufhgJUIH7758yhuiH74587w', // Ganti dengan secret key Anda
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set ke true jika menggunakan HTTPS
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // Cookie valid untuk 1 hari
    },
}));


app.use(cors({
    origin: 'http://localhost:3000', // Ganti dengan domain frontend Anda
    credentials: true,
}));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));