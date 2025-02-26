import User from '../models/user.model.js';
import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export const signup =  async (req, res) => {
    console.log('signup');
    try {
        const user = req.body;
        console.log(user);
        if ( !user.email ||  !user.password ||  !user.firstname ||  !user.lastname ||  !user.roles ||  !user.status || !user.username) {
            return res.status(400).json({ succes: false,  message: 'Please fill in all fields' });
        }
        
        const existingUsername = await User.findOne({ username: user.username });
        if (existingUsername) {
            return res.status(400).json({ success: false, message: 'Username already in use' });
        }

        const existingEmail = await User.findOne({ email: user.email });
        if (existingEmail) {
            return res.status(400).json({ success: false, message: 'Email already in use' });
        }

        if (user.password.length < 8) {
            return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
        }


        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash (user.password, salt);

        const newUser = new User (user);
        newUser.password = hashedPassword;

    
        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            console.log(`user created: ${newUser.username}`);

            const { password, ...userWithoutPassword } = newUser.toObject();
            res.status(201).json({ success: true, message: 'user created successfully', data: userWithoutPassword });
        }
        else {
            res.status(400).json({ success: false, message: 'Invalid user data' });
        }

    } catch (error) {
        res.status(500).json({ success: false, message:  'user creation failed', error: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        console.log('Șterg cookies-ul token...');
        res.clearCookie('token', { maxAge: 0, httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV !== 'development' });
        res.status(200).json({ success: true, message: 'User logged out successfully' });
    } catch (error) {
        console.error('Eroare la logout:', error);
        res.status(500).json({ success: false, message: 'User logout failed', error: error.message });
    }
};

export const login = async (req, res) => { 
    try {
        console.log('Attempting login...');
        const { email, password: userPassword } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const isPasswordCorrect = await bcrypt.compare(userPassword, user.password);
        if (!isPasswordCorrect) {
            console.log('Password incorrect');
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = generateTokenAndSetCookie(user._id, res);
        console.log('Token generated and cookie set');
        
        const { password, ...userWithoutPassword } = user.toObject();

        console.log('Cookies setate:', res.getHeaders()['set-cookie']);

        res.status(200).json({ 
            success: true,
            message: 'User logged in successfully',
            data: userWithoutPassword,
            token: token
         });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'User retrieval failed', error: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        console.log('GETUSER FUNCTION');
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const { password, ...userWithoutPassword } = user.toObject();
        res.status(200).json({ success: true, data: userWithoutPassword });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'User retrieval failed', error: error.message });
    }
}
