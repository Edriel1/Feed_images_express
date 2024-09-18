import jwt from 'jsonwebtoken';
import Prisma from '../../prisma.service';
import {Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import bcryptjs from 'bcryptjs';

dotenv.config();

const prisma = new Prisma();

export default class security {
    public async verifyToken(req: Request, res: Response, next: NextFunction){
        const {authorization} = req.headers;

        if(!authorization) {
            return res.status(401).json({
            error: ['Login required'],
            });
        }

        const [texto, token] = authorization.split(' ');

        try{
            const key: any = process.env.TOKEN_SECRET;
            const dados: any = jwt.verify(token, key);
            const {id, email} = dados;
            const User = await prisma.user.findUnique({where: {id, email}});
            if(!User){
            return res.status(401).json({errors: ['Usuario invalido']});
            }
            req.body.userId = id;
            req.body.userEmail = email;
            return next();
        } catch(e) {
            return res.status(401).json({
            error: ['Token expirado ou invalido.', e],
            })
        }
}
public async protectPassowrd(password: string){
    let password_hash: string = '';
    if(password) password_hash = await bcryptjs.hash(password, 8);
    
    return password_hash;
};

public passwordIsValid = async (password: string, password_hash: string) => {
    return await bcryptjs.compare(password, password_hash);
};

public login = async (req: Request, res: Response) => {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
        return res.status(401).json({
            errors: ['Credenciais invalidas'],
        });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    console.log(user);
    if (!user) {
        return res.status(401).json({
            errors: ['Usuario nao existe'],
        });
    }
    if (!(await this.passwordIsValid(password, user.password))) {
        return res.status(401).json({
            errors: ['Senha invalida'],
        });
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, String(process.env.TOKEN_SECRET), {
        expiresIn: process.env.TOKEN_EXPIRATION,
    });

    res.json({ seuToken: token });
}
}
