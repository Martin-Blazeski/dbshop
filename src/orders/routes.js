import { Router } from 'express';
import actions from './actions';

const { create, list, listOne, erase, newOrder } = actions;
 
const ordersRouter = Router();

ordersRouter.post('/users/:userId/new-order/:itemId', create);
ordersRouter.get('/users/orders', list);
ordersRouter.get('/users/:id/orders', listOne);
ordersRouter.delete('/users/:id/ordersId', erase);
ordersRouter.get('/users/:userId/orders', newOrder);

export default ordersRouter;