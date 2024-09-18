import UserController from '../controllers/user.controller';
import {Router} from 'express';
import Token from '../middlewares/token';

const route: Router = Router();
const token = new Token();

route.post('/', UserController.create);
route.get('/login', token.login);
route.put('/:id', token.verifyToken, UserController.update);
route.get('/:id', token.verifyToken, UserController.findByID);
route.delete('/:id', token.verifyToken, UserController.delete);

export default route;


