import {Request, Response} from 'express';
import post_service from '../services/post.service';

const postService = new post_service;
export default class post {

    public async create(req: Request | any, res: Response) {
        try{
            const images: Array<{url: string}> = [];
            
            req.files.forEach((image: any) => {
                const {filename} = image;
                images.push({url: `${process.env.URL}${process.env.PORT}/uploads/${filename}`});
            });

            const new_post = await postService.create({...req.body, images: {create: images}});

            res.status(200).json(new_post);
        } catch(e) {res.status(400).json({error: ['Nao foi possivel criar o post', e]})}
    };
}