import mongoose from 'mongoose';

const pharmacySchema = new mongoose.Schema({
    formattedAddress: { 
        type: String, 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    location: {
        type: {
            type: String,
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: { 
            type: [Number],
             required: true } // [longitude, latitude]
    },
}, 
{
     timestamps: true 
    });

const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);
export default Pharmacy;