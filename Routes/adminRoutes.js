import express from "express";
import {getAllPharmacy,updatePharmacyStatus,adminLogin,} from "../Controllers/adminController.js";
// import { getAllPharmacy } from "../Controllers/authController.js";
const adminRouter = express.Router();

adminRouter.post("/adminlogin", adminLogin);
adminRouter.get("/pharmacy", getAllPharmacy);
adminRouter.put("/pharmacy/:id/status", updatePharmacyStatus);

export default adminRouter;
