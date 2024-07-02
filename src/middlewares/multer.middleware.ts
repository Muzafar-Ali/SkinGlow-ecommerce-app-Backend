import multer from "multer"
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadsPath; 

    if(file.fieldname === 'thumbnail'){
      uploadsPath = path.join(__dirname, '..', '..', 'uploads', 'thumbnail');

    }else {
      uploadsPath = path.join(__dirname, '..', '..', 'uploads', 'images');
    }

    cb(null, uploadsPath)
  },
  
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split('/');
    let extension = extArray[extArray.length - 1];
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
  }
})

export const upload = multer({ storage: storage }).fields([
  { name: 'thumbnail', maxCount: 1 }, 
  { name: 'images', maxCount: 5 }, 
]);
