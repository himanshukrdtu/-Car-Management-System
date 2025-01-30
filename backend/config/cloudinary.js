import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

// Debugging: Print environment variables
 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,  // Corrected key name
    api_key: process.env.API_KEY,        // Corrected key name
    api_secret: process.env.API_SECRET   // Corrected key name
});

export default cloudinary;
