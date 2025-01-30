import multer from 'multer';
import cloudinary from '../utils/cloudinary.js'; // Import the configured Cloudinary

// Configure multer to use memory storage (to send the image directly to Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).array('photos', 10); // Allow multiple images, max 10 photos

export default upload; // Export multer middleware so it can be used in other files
