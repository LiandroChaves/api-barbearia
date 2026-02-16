import { Router } from 'express';
import { CreateUserController } from '../controllers/CreateUserController';
import { UpdateUserController } from '../controllers/UpdateUserController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const userRoutes = Router();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();

userRoutes.post('/', createUserController.handle);
userRoutes.put('/profile', ensureAuthenticated, updateUserController.handle);

export default userRoutes;