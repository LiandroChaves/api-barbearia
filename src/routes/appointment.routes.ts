import { Router } from 'express';
import { CreateAppointmentController } from '../controllers/CreateAppointmentController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ListUserAppointmentsController } from '../controllers/ListUserAppointmentsController';
import { CancelAppointmentController } from '../controllers/CancelAppointmentController';

const appointmentRoutes = Router();
const createAppointmentController = new CreateAppointmentController();
const listUserAppointmentsController = new ListUserAppointmentsController();
const cancelAppointmentController = new CancelAppointmentController();

appointmentRoutes.post('/', ensureAuthenticated, createAppointmentController.handle);
appointmentRoutes.get('/me', ensureAuthenticated, listUserAppointmentsController.handle);
appointmentRoutes.delete('/:id', ensureAuthenticated, cancelAppointmentController.handle);

export default appointmentRoutes;