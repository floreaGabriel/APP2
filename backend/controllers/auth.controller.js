import User from '../models/user.model.js';
import mongoose from 'mongoose';

export const signup =  async (req, res) => {
    const participant = req.body;

    if (!participant.email || !participant.password || !participant.firstname || !participant.lastname || !participant.roles || !participant.status) {
        return res.status(400).json({ succes: false,  message: 'Please fill in all fields' });
    }

    const newParticipant = new User(participant);

    try {
        await newParticipant.save();
        console.log(`Participant created ${newParticipant}`);
        res.status(201).json({ success: true, message: 'Participant created successfully', data: newParticipant });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Participant creation failed', error: error.message });
    }
};

export const logout = async (req,res) => {
    const {id} = req.params;
    
    if (!id) {
        return res.status(400).json({ success: false, message: 'Please provide an id' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid ID'});
    }


    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Participant deleted successfully' });
        
    } catch(error) {
        res.status(500).json({ success: false, message: 'Participant deletion failed', error: error.message });
    }
};

export const login = async (req, res) => { 
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ success: false, message: 'Please provide an id' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid ID'});
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Participant not found' });
        }
        res.status(200).json({ success: true, message: 'Participant found', data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Participant retrieval failed', error: error.message });
    }
};