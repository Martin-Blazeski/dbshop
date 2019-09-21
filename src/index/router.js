import { Router } from 'express';
import users from '../users/index';
import orders from '../orders/index';
import items from '../items/index';

const userRouter = users.routes
const ordersRouter = orders.routes
const itemsRouter = items.routes
const indexRouter = Router();

indexRouter.use(userRouter);
indexRouter.use(ordersRouter);
indexRouter.use(itemsRouter);

export default indexRouter;