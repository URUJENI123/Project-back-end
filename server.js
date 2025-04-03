import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRoutes from "./Routes/authRoutes.js";
import doctorRoutes from "./Routes/doctorRoutes.js";
import appointmentRoutes from "./Routes/appointmentRoutes.js";
import pharmacyRoutes from "./Routes/pharmacyRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import medicineRoutes from "./Routes/medicineRoutes.js";
import adminRouter from "./Routes/adminRoutes.js";

// Load environment variables from the .env file
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Environment variables
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
const db_name = process.env.DB_NAME;
const jwt_name = process.env.JWT_NAME;
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

// Middlewares
app.use(bodyParser.json());
app.use(express.json()); // Parse JSON requests

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/pharmacies", pharmacyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/medicine", medicineRoutes);
app.use("/admin", adminRouter);

// MongoDB URI from environment variables
const dbUri = `mongodb+srv://${db_user}:${encodeURIComponent(
  db_pass
)}@cluster0.1fjbs7j.mongodb.net/${db_name}?retryWrites=true&w=majority&appName=Cluster0`;

// MongoDB connection
mongoose.set("strictQuery", false); // Avoid strict query warnings
mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");

    // Start server after MongoDB connection is successful
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });

// Catch-all error handler for unhandled routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
