import { Request, Response } from 'express';
import ListPublicDataService from '../services/ListPublicDataService';

export class ListPublicDataController {
    async handleBarbers(req: Request, res: Response) {
        const barbers = await ListPublicDataService.listBarbers();
        return res.json(barbers);
    }

    async handleServices(req: Request, res: Response) {
        const services = await ListPublicDataService.listServices();
        return res.json(services);
    }
}