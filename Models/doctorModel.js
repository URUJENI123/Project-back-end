import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        defaulf: 0
    },
},
{
    timestamps: true
});

const Doctor = mongoose.model('Doctor',doctorSchema);
export default Doctor;