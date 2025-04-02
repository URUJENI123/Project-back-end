import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
         type: String, 
         unique: true, 
         required: true 
        },
    phone: { 
        type: String, 
        unique: true 
    },
    password: { 
        type: String,
        required: true
    },
    role: {
         type: String,
         default:"user",
        enum: ['patient', 'doctor', 'pharmacist', 'admin'],
        required: true 
   },
    token:{
        accessToken:{
            type:String,
            default:""
        },
    },
}, 
{ 
    timestamps: true 
});

const User = mongoose.model('User ', userSchema);
export default User;