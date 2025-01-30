import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'cars', // Folder in Cloudinary
      format: async (req, file) => 'png', // Convert all uploads to PNG
      allowedFormats: ['jpg', 'png', 'jpeg'], // Allowed file formats
      public_id: (req, file) => file.originalname.split('.')[0], // Set public ID based on original name
    },
  });

const upload = multer({ storage });

export default upload;
