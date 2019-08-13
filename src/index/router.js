import { Router } from 'express';
import users from '../users/index';

const { routes } = users;
const indexRouter = Router();

indexRouter.use(routes);

export default indexRouter;