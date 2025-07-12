import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "item-images",
      format: "webp",
      public_id: `item-${Date.now()}-${file.originalname.split(".")[0]}`,
    };
  },
});

export default storage;
