import {Router} from 'express';
import multerConfig from '../config/multerConfig';
import multer from 'multer';
import postController from '../controllers/post.controller';
import Token from  '../middlewares/token';

const upload = multer(multerConfig).array('foto', 5);
const route = Router();
const post = new postController();
const token = new Token();

route.post('', token.verifyToken, upload, post.create); //Strategy, Chain of Responsibility
route.get('/feed', token.verifyToken, post.feedPost);
route.get('/:id', token.verifyToken, post.findPostByID);
route.delete('/:id', token.verifyToken, post.delete);

export default route;