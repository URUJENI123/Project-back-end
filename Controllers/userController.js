import User from '../Models/userModel.js';

export const getUserProfile = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if(!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error });
    }
};