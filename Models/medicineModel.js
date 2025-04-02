import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
    pharmacyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pharmacy',
        required: true
    },
    name:{
        type: String,
        required: true
    },
    availableStock:{
        type: Number,
        defaulf: 0
    },
},{
    timestamps: true
});

const Medicine = mongoose.model('Medicine',medicineSchema);
export default Medicine;