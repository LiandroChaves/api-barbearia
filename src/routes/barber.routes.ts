import { Router } from 'express';
import { CreateBarberController } from '../controllers/CreateBarberController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ListPublicDataController } from '../controllers/ListPublicDataController';

const barberRoutes = Router();
const createBarberController = new CreateBarberController();
const listPublicDataController = new ListPublicDataController();

barberRoutes.post('/', ensureAuthenticated, ensureAdmin, createBarberController.handle);
barberRoutes.get('/public', listPublicDataController.handleBarbers);

export default barberRoutes;