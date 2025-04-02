import Appointment from '../Models/appointmentModel.js';

export const createAppointment = async (req, res) => {
    const { patientId, doctorId, appointmentTime } = req.body;

    try {
        const newAppointment = new Appointment({ patientId, doctorId, appointmentTime});
        await newAppointment.save();
        res.status(201).json({ message: 'Appointment created', appointment: newAppointment });
    } catch (error) {
        res.status(400).json({ message: 'Error creating Appointment', error});
    }
};
