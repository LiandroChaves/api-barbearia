import { Router } from 'express';
import { CreateServiceController } from '../controllers/CreateServiceController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ListPublicDataController } from '../controllers/ListPublicDataController';

const serviceRoutes = Router();
const createServiceController = new CreateServiceController();
const listPublicDataController = new ListPublicDataController();

serviceRoutes.post('/', ensureAuthenticated, ensureAdmin, createServiceController.handle);
serviceRoutes.get('/public', listPublicDataController.handleServices);

export default serviceRoutes;