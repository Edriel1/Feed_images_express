import jwt from 'jsonwebtoken';
import User from '../services/user.service';
import {Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';

dotenv.config();

const user = new User();

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
            const User = await user.findUserByID({id, email});
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
}}
