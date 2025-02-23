import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(cookieParser());


// Middleware pentru verificarea token-ului
const verifyToken = (req, res, next) => {

    console.log("Verificare token");
    
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Token lipsă' });
    }

    try {
        const decoded = jwt.verify(token, '0k7gYR3kVUYeb3U2vwuPr3ELTAgsXL2JlUQnBZel3Uc=');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token invalid' });
    }
};

// Rută de test protejată
app.get('/api/test-auth', verifyToken, (req, res) => {
    res.json({ message: 'Token valid! Ești autentificat.' });
});
app.use("/api/auth", authRoutes);
app.get("/api/users", userRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port: ${PORT}\nServer started at http://localhost:${PORT}`);
});
    

