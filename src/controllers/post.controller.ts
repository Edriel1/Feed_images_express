import {Request, Response} from 'express';
import post_service from '../services/post.service';
import imageService from '../services/Images.service';
import dotenv from 'dotenv';
import fs from 'fs';
import {resolve} from 'path';

dotenv.config();
const imagesService = new imageService();
const postService = new post_service();
export default class post {//Adapter

    public async create(req: Request | any, res: Response) {
        try{
            const images: Array<{url: string}> = [];
            
            req.files.forEach((image: any) => {
                const {filename} = image;
                images.push({url: `${process.env.URL}${process.env.PORT}/${filename}`});
            });

            const {title, content, author} = req.body;

            const new_post = await postService.create({title, content, author:{connect: {id: Number(author)}}});
            images.forEach(async (image) => {
                await imagesService.create({compose: {connect: {id: new_post.id}}, url: image.url});
            });
            
            res.status(200).json(new_post);
        } catch(e) {res.status(400).json({error: ['Nao foi possivel criar o post', e]})}
    };

    public async feedPost(req: Request, res: Response) {
        try{
            const feed = await postService.feedPost(Number(req.body.skip));
            res.status(200).json(feed);
        } catch(e) {res.status(400).json({error: ['Nao foi possivel chamar o feed', e]})}
    };

    public async findPostByID(req: Request, res: Response) {
        try{
            res.status(200).json(await postService.findPostByID({id: Number(req.params.id)}));
        } catch(e) {res.status(400).json({error: ['Nao foi possivel encontrar o post', e]})}
    };

    public async delete(req: Request, res: Response) {
        try{
            const images = (await postService.findPostByID({id: Number(req.params.id)}))?.images;
            await postService.delete({id: Number(req.params.id)});

            images?.forEach(image => {fs.unlink(`${image.url.replace(`${process.env.URL}${process.env.PORT}`, resolve('uploads'))}`, err => {if(err) throw err;})});

            
            res.status(200).json('Post deletado com sucesso');
        } catch(e) {res.status(400).json({error: ['Nao foi possivel deletar o post', e]})}
    };
}