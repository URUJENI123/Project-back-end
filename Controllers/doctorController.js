import Doctor from '../Models/doctorModel.js';

export const createDoctorProfile = async (req, res) => {
    const { userId, specialty, profile } = req.body;

    try {
        const newDoctor = new Doctor({ userId, specialty, profile });
        await newDoctor.save();
        res.status(201).json({ message: 'Doctor profile created', doctor: newDoctor }); 
    } catch (error) {
        res.status(400).json({ message: 'Error creating doctor profile', error });
    }
};
