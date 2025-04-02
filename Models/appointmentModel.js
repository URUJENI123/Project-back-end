import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    appointmentTime:{
        type: Date,
        required: true
    },
    status:{
        type: String,
        enum: ['pending', 'confirmed', 'canceled'],
        defaulf: 'pending'
    },
},{
    timestamps: true
});

const Appointment = mongoose.model('Appointment',appointmentSchema);
export default Appointment;