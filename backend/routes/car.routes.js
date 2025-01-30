import express from "express";
import upload from '../middleware/multer.js';
import { addCar, getAllCars, getCarsByUserId, deleteCar, updateCarDetails } from "../controllers/car.controller.js";
import  isAuthenticated  from "../middleware/isAuthenticated.js";
 

const router = express.Router();

router.post("/add-car",isAuthenticated, upload.array('images', 10), addCar);
router.get("/getAllCars", getAllCars);
router.get("/getCarsByUserId", getCarsByUserId);
router.delete("/deleteCar/:carId",isAuthenticated, deleteCar);
router.put("/updateCar/:carId", isAuthenticated, upload.array('images', 10), updateCarDetails);

export default router;
   