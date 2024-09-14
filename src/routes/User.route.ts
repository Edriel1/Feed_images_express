import UserController from '../controllers/user.controller';
import {Router} from 'express';

const route: Router = Router();

route.post('/', UserController.create);
route.put('/:id', UserController.update);
route.get('/:id', UserController.findByID);
route.delete(':id', UserController.delete);

export default route;


