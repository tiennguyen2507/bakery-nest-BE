import { diskStorage } from 'multer';

export const storageConfig = (folder: string) =>
  diskStorage({
    destination: `update/${folder}`,
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
