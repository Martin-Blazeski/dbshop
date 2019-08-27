import { Router } from 'express';
import actions from './actions';

const { create, list, get, del, update,  listUserItems } = actions;
 
const itemRouter = Router();

itemRouter.post('/add-items', create);
itemRouter.get('/items', list);
itemRouter.get('/items/:id', get);
itemRouter.delete('/items/:id', del);
itemRouter.put('/items/:id', update);
itemRouter.get('/users/:userId/items', listUserItems);

export default itemRouter;