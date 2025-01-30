import express from "express";
import upload from '../middleware/multer.js';
import { addCar, getAllCars, getCarsByUserId, deleteCar, updateCarDetails } from "../controllers/car.controller.js";

 

const router = express.Router();

router.post("/add-car", upload.array('images', 10), addCar);
router.get("/getAllCars", getAllCars);
router.get("/getCarsByUserId", getCarsByUserId);
router.delete("/deleteCar/:carId", deleteCar);
router.put("/updateCar/:carId", upload.array('images', 10), updateCarDetails);

export default router;
