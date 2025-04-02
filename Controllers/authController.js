import User from '../Models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateAccessToken } from "../Utils/tokenGenerating.js";
import Pharmacy from '../Models/pharmacyModel.js';

export const register = async (req, res) => {
    const { email, phone, password, role, token} = req.body;

    try {
        const existingUser = await User.findOne({userEmail});
        if(existingUser){
            return res.status(400).json({message:"email already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, phone, password:hashedPassword, role });
        user.tokens.accessToken=generateAccessToken(user);
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully',
             user:{ 
                ...newUser.toObject(),
                tokens:{
                    accessToken:user.token.accessToken,
                },
             },
         });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error registering user' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const accessToken = generateAccessToken(user);
        user.tokens = { accessToken};
        await user.save();
        const token = jwt.sign({ id: user._id, role: user.role });
        res.json({ token });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error logging in' });
    }
};
export const getAllPharmacy = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.find();
    res.status(200).json(pharmacy);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const approvePharmacy = async (req, res) => {
  try {
    const { id } = req.params;
    const pharmacy = await pharmacy.findById(id);

    if (!pharmacy) {
      return res.status(404).json({ message: "Pharmacy not found" });
    }

    pharmacy.approvalStatus = "approved";
    await garage.save();

    res.status(200).json({ message: "Pharmacy approved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const rejectPharmacy = async (req, res) => {
  try {
    const { id } = req.params;
    const pharmacy = await Pharmacy.findById(id);

    if (!pharmacy) {
      return res.status(404).json({ message: "Pharmacy not found" });
    }

    pharmacy.approvalStatus = "rejected";
    await pharmacy.save();

    res.status(200).json({ message: "Pharmacy rejected successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
