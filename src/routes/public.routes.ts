import { Router } from 'express';
import { ListPublicDataController } from '../controllers/ListPublicDataController';

const publicRoutes = Router();
const listPublicDataController = new ListPublicDataController();

publicRoutes.get('/barbers', listPublicDataController.handleBarbers);
publicRoutes.get('/services', listPublicDataController.handleServices);

export default publicRoutes;