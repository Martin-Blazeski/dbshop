import { Router } from 'express';
import actions from './actions';

const { create, list, listOne, erse, newOrders } = actions;
 
const ordersRouter = Router();

ordersRouter.post('users/:userId/new-order', create);
ordersRouter.get('/users/orders', list);
ordersRouter.get('/users/:id/orders', listOne);
ordersRouter.delete('/users/:id/ordersId', erse);
ordersRouter.get('/users/:userId/orders', newOrders);

export default ordersRouter;