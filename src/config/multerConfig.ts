import multer from 'multer';
import {extname, resolve} from 'path';

function numeroAleatorio() {return Math.floor(Math.random() * 1000 + 10000)}

export default {
  filefilter: (req: any, file: any, cb: any): any => {
    if(file.mimetype !== 'imagen/png' && file.mimetype !== 'imagen/jpeg') {
      return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", 'Arquivo precisa ser PNG ou JPG.'));
    }
    return cb(null, true);
  },

  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}${numeroAleatorio()}${extname(file.originalname)}`);
    }
  })
}
