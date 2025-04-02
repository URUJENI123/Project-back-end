import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import Pharmacy from "../Models/pharmacyModel.js";



export const getAllPharmacy = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const pharmacy = await Pharmacy.find();
    res.json(pharmacy);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const updatePharmacyStatus = async (req, res) => {
  const { status } = req.body;

  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    if (!["approved", "rejected"].includes(status)) {
      return res
        .status(400)
        .json({
          message: "Invalid status value. Use 'approved' or 'rejected'.",
        });
    }

    const pharmacy = await Pharmacy.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!garage) {
      return res.status(404).json({ message: "Pharmacy not found" });
    }

    res.json({ message: `Pharmacy ${status} successfully`, pharmacy });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const adminLogin = async (req, res) => {
  const { userEmail, userPassword } = req.body;

  try {
    
    const user = await User.findOne({ userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    const isMatch = await bcrypt.compare(userPassword, user.userPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    
    if (user.userRole !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. You must be an admin." });
    }

    
    const token = jwt.sign(
      { userId: user._id, role: user.userRole },
      process.env.JWT_SECRET, 
      { expiresIn: "1h" }
    );

    
    res.status(200).json({
      success: true,
      token,
      role: user.userRole,
    });
  } catch (error) {
    console.error("Error during admin login:", error); 
    res.status(500).json({ message: "Server error", error: error.message }); 
  }
};
