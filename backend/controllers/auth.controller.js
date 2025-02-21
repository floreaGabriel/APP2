import User from '../models/user.model.js';
import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export const signup =  async (req, res) => {
    try {
        const user = req.body;

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

export const logout = async (req,res) => {
    try {
        res.cookie('jwt', '', { maxAge: 0 });
        res.status(200).json({ success: true, message: 'User logged out successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'User logout failed', error: error.message });
    }
};

export const login = async (req, res) => { 
    try {
        const { username, password: userPassword } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const isPasswordCorrect = await bcrypt.compare(userPassword, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        generateTokenAndSetCookie(user._id, res);
        const { password, ...userWithoutPassword } = user.toObject();
        res.status(200).json({ success: true, message: 'User logged in successfully', data: userWithoutPassword });
    } catch (error) {
        res.status(500).json({ success: false, message: 'User retrieval failed', error: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
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