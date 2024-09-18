import {Router} from 'express';
import multerConfig from '../config/multerConfig';
import multer from 'multer';
import postController from '../controllers/post.controller';

const upload = multer(multerConfig).array('foto', 5);
const route = Router();
const post = new postController();

route.post('', upload, post.create);
route.get('/feed', post.feedPost);
route.get('/:id', post.findPostByID);
route.delete('/:id', post.delete);

export default route;