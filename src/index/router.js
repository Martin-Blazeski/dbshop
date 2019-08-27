import { Router } from 'express';
import users from '../users/index';
import orders from '../orders/index';
import items from '../items/index';

const { routes } = users;
const { orders.routes } = orders;
const { items.routes } = items;
const indexRouter = Router();

indexRouter.use(routes);
indexRouter.use(orders.routes);
indexRouter.use(items.routes);

export default indexRouter;