
import { Car } from '../models/car.model.js';

 
export const addCar = async (req, res) => {

    console.log("i am add car" );
    try {
        const { title, description, car_type, company, dealer, year, price, user, tags } = req.body;
        const images = req.files?.map(file => file.path);
    
        if (images.length > 10) return res.status(400).json({ message: 'Maximum 10 images allowed' });
    
        const car = new Car({ title, description, images, tags, car_type, company, dealer, year, price, user });
        console.log(req.body);
        console.log("i am add car1" );
        // console.log("i am add car2",req.files);
        await car.save();
        console.log("i am add car2" );
          

        res.status(201).json({ message: 'Car added successfully', car });
      } catch (error) {
        res.status(500).json({ message: 'Error adding car', error: error.message });
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
    console.log("i am update car");
    try {
        const { title, description, tags, car_id } = req.body;
        const images = req.files?.map(file => file.path);
 
        if (!car_id) {
            return res.status(400).json({ message: 'Car ID is required' });
        }

      
        const car = await Car.findById(car_id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        console.log("Car found");

      
        car.title = title || car.title;
        car.description = description || car.description;
        car.tags = tags || car.tags;

   
        if (images && images.length > 0) {
            if (images.length > 10) {
                return res.status(400).json({ message: 'Maximum 10 images allowed' });
            }
            car.images = [...images];
        }

       
        await car.save();
        console.log("i am update car2");

        res.status(200).json({ message: 'Car details updated successfully', car });
    } catch (error) {
        console.error('Error updating car:', error);
        res.status(500).json({ message: 'Error updating car', error: error.message });
    }
};

  