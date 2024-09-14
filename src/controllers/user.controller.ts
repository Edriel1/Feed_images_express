
import UserService from '../services/user.service';
import {Request, Response} from 'express';
import {Prisma, PrismaClient} from '@prisma/client';

const user = new UserService();

class UserController {

     async create(req: Request, res: Response){
        try{
            const data_create: Prisma.userCreateInput = req.body;
            const newUser: Prisma.userCreateInput = await user.create(data_create);
            return res.status(200).json(newUser); 
        }
        catch(e){
            return res.status(400).json({error: ['Nao foi possivel criar o usuario', e]});
        }
    };

    async update(req: Request, res: Response) {
        try{
            const {name, email} = await user.update({id: Number(req.params.id)}, req.body);
            return res.status(200).json({name, email});
        }
        catch(e){return res.status(400).json({error: ['Nao foi possivel fazer o update' , e]});}
    };

    async findByID(req: Request, res: Response){
        try{
            return res.status(200).json(await user.findUserByID({id: Number(req.params.id)}));
        }
        catch(e){res.status(400).json({error: ['Usuario nao encontrado', e]});}
    };

    async delete(req: Request, res: Response) {
        try{
            return res.status(200).json(await user.delete({id: Number(req.params.id)}));
        }
        catch(e){res.status(400).json({error: ['Usuario nao encontrado',e]});}
    };
};

export default new UserController()