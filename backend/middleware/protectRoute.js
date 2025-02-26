import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log('cookies: ', req.cookies);
        console.log('token: ', token);

        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decodat:', decoded);
        
        if (!decoded) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }

        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found by middleware' });
        }

        req.user = user;
        next();     
    } catch (error) {
        return res.status(500).json({ success: false, message: 'User retrieval failed', error: error.message });
    }
}