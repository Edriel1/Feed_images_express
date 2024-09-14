import multer from 'multer';
import multerConfig from '../config/multerConfig.js';

import Foto from '../models/Foto.js';

const upload = multer(multerConfig).array('foto', 5);

class ImageService {
  create(req, res) {
    return  upload(req, res, async error => {
      if(error){
        return res.status(400).json({errors: [error.code]});
      }

      try{

    req.files.foreach(async image => {
      const {originalname, filename} = image;
      const {aluno_id} = req.body;
      const foto = await Foto.create({originalname, filename, aluno_id})
    });

      return res.json(foto);
      } catch(e) {return res.status(400).json({errors: ['Aluno nao existe.']});}
    });
  }
}

export default new FotoController();
