import express, { Request, Response } from 'express';

import ItemsController from '../src/controllers/ItemsController';
import PointsController from './controllers/PointsControllers';

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController(); 


routes.get('/items',itemsController.index);
routes.get('/points', pointsController.index);
routes.post('/points', pointsController.create);
routes.get('/points/:id', pointsController.show);
  
    

export default routes;