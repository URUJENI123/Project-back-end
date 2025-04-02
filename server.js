import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './Routes/authRoutes.js';
import doctorRoutes from './Routes/doctorRoutes.js';
import appointmentRoutes from './Routes/appointmentRoutes.js';
import pharmacyRoutes from './Routes/pharmacyRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import medicineRoutes from './Routes/medicineRoutes.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import adminRouter from './Routes/adminRoutes.js';
dotenv.config();
const port =process.env.PORT || 5000
const db_user = process.env.DB_USER;
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const db_name = process.env.DB_NAME;
const db_pass = process.env.DB_PASS;

const app = express();
app.use(bodyParser.json());
// app.use('/',connectDB());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/pharmacies', pharmacyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/medicine', medicineRoutes);
app.use('/admin', adminRouter);

const dbUri = `mongodb+srv://urujenideborah80:<L47jvBCS8zyy7dkA>@cluster0.lacry.mongodb.net/`;
mongoose.set("strictQuery",false);
mongoose
    .connect(dbUri)
    .then(()=>{
        console.log("Connect to MongoDB");
        app.listen(port, () => {
            console.log(`Server is running on port http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error)
    })
    