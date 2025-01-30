import multer from 'multer';
import cloudinary from '../utils/cloudinary.js';
import { Car } from '../models/car.model.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).array('photos', 10);

export const addCar = async (req, res) => {
    try {
        console.log("Code tested");

        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({
                    message: "Error uploading the images.",
                    success: false
                });
            }

            const { title, description, car_type, company, dealer, year, price, tags, user } = req.body;

            if (!title || !description || !car_type || !company || !dealer || !year || !price || !user) {
                return res.status(400).json({
                    message: "All fields are required.",
                    success: false
                });
            }

            if (req.files && req.files.length > 0) {
                const photoUrls = [];

                for (let i = 0; i < req.files.length; i++) {
                    const file = req.files[i];

                    await new Promise((resolve, reject) => {
                        cloudinary.uploader.upload_stream(
                            { resource_type: 'auto' },
                            (error, result) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    photoUrls.push(result.secure_url);
                                    resolve();
                                }
                            }
                        ).end(file.buffer);
                    });
                }

                const car = await Car.create({
                    title,
                    description,
                    car_type,
                    company,
                    dealer,
                    year,
                    price,
                    tags: tags || [],
                    images: photoUrls,
                    user
                });

                return res.status(201).json({
                    message: "Car added successfully with photos.",
                    success: true,
                    car,
                });
            } else {
                return res.status(400).json({
                    message: "No image files uploaded.",
                    success: false
                });
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong.",
            success: false
        });
    }
};

export const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find();

        if (cars.length === 0) {
            return res.status(404).json({
                message: "No cars found.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Cars retrieved successfully.",
            success: true,
            cars
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong while fetching cars.",
            success: false,
        });
    }
};

export const getCarsByUserId = async (req, res) => {
    try {
        const { user } = req.query;

        if (!user) {
            return res.status(400).json({
                message: "User ID is required.",
                success: false,
            });
        }

        const cars = await Car.find({ user: user });

        if (cars.length === 0) {
            return res.status(404).json({
                message: "No cars found for this user.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Cars retrieved successfully.",
            success: true,
            cars,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong while fetching cars.",
            success: false,
        });
    }
};

export const deleteCar = async (req, res) => {
    try {
      const { carId } = req.params;
      console.log("Received carId:", carId);
  
      if (!carId) {
        return res.status(400).json({ success: false, message: "Car ID is required" });
      }
  
      const deletedCar = await Car.findByIdAndDelete(carId);
  
      if (!deletedCar) {
        return res.status(404).json({ success: false, message: "Car not found" });
      }
  
      res.status(200).json({ success: true, message: "Car deleted successfully" });
    } catch (error) {
      console.error("Error deleting car:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const updateCarDetails = async (req, res) => {
    try {
        const { title, description, tags, car_id } = req.body;
        const images = req.files ? req.files : [];

        if (!car_id) {
            return res.status(400).json({ message: 'Car ID is required', success: false });
        }
         
        const car = await Car.findById(car_id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found', success: false });
        }
        if(car){
            console.log("Car found");
        }

        car.title = title || car.title;
        car.description = description || car.description;
        car.tags = tags || car.tags;

        if (images.length > 0) {
            const photoUrls = [];

            for (let i = 0; i < images.length; i++) {
                const file = images[i];
                console.log("img" , i);
                await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        { resource_type: 'auto' },
                        (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                photoUrls.push(result.secure_url);
                                resolve();
                            }
                        }
                    ).end(file.buffer);
                });
            }

            car.images = [...photoUrls];
         }

        await car.save();

        return res.status(200).json({
            message: 'Car details updated successfully',
            success: true,
            car
        });
    } catch (error) {
        console.error('Error updating car:', error);
        return res.status(500).json({ message: 'Server error', success: false });
    }
};