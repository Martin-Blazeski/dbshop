import express from 'express';
import bodyPartser from 'body-parser';
import  helmet from 'helmet';
import logger from 'morgan';
import cors from 'cors';

import indexRouter from './index/router';

const app = express ();
const port = process.env.PORT  || 3001;

app.use(logger('dev'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true}));
app.(bodyParser.json({ type: '*/*'}));

app.use(indexRouter);

app.listen(port, ()=>{
    console.log(`SERVER is listening on ${port}`);
})
