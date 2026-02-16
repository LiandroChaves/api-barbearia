import { Router } from 'express';
import userRoutes from './user.routes';
import sessionsRoutes from './sessions.routes';
import barberRoutes from './barber.routes';
import serviceRoutes from './service.routes';
import appointmentRoutes from './appointment.routes';
import publicRoutes from './public.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/barber', barberRoutes);
routes.use('/service', serviceRoutes);
routes.use('/appointment', appointmentRoutes);
routes.use('/public', publicRoutes);

export default routes;