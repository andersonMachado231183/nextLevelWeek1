import express, { Request, Response } from 'express';
import knex from './database/connection';
import ItemsController from '../src/controllers/ItemsController';
import PointsController from './controllers/PointsControllers';

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController(); 


routes.get('/items',itemsController.index);
  
routes.post('/points', pointsController.create);
    

export default routes;