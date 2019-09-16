import { Router } from 'express';
import actions from './actions';

const { create, list, listOne, erse, listUserItems } = actions;
 
const itemRouter = Router();

itemRouter.post('/add-items', create);
itemRouter.get('/items', list);
itemRouter.get('/items/:id', listOne);
itemRouter.delete('/items/:id', erse);
itemRouter.get('/users/:userId/items', listUserItems);

export default itemRouter;

