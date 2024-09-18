import prisma from '../../prisma.service';
import {Prisma} from '@prisma/client';
import {services} from '../../service';

const prismaService = new prisma();

@services
export default class ImageService {
  public async create(data: Prisma.imageCreateInput) {

     return await prismaService.image.create({data});
    // return  upload(req, res, async error => {
    //   if(error){
    //     return res.status(400).json({errors: [error.code]});
    //   }

    //   try{

    // req.files.foreach(async image => {
    //   const {originalname, filename} = image;
    //   const {aluno_id} = req.body;
    //   const foto = await Foto.create({originalname, filename, aluno_id})
    // });

    //   return res.json(foto);
    //   } catch(e) {return res.status(400).json({errors: ['Aluno nao existe.']});}
    // });
  }
}
