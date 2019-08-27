import { Router } from 'express';
import actions from './actions';

const { create, list, get, del, update, login, listUserPosts } = actions;
 
const ordersRouter = Router();

ordersRouter.post('users/:userId/new-order', create);
ordersRouter.get('/users/orders', list);
ordersRouter.get('/users/:id/orders', get);
ordersRouter.delete('/users/:id/ordersId', del);
ordersRouter.put('/users/:id/orderId', update);
ordersRouter.get('/users/:userId/orders', listUserOrders);

export default ordersRouter;