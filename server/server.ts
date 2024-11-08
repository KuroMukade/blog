import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';

import { handleRequest } from 'lib/handleRequest';
import { handleErrors } from 'lib/handleErrors';

import { APP_ROUTES } from './routes/index';

const app = express();

app.use(cookieParser());

app.use('/static', express.static(path.join(__dirname, '../client')));

const router = express.Router();

router.use('/', (req, res) => handleRequest(req.url, res, req, APP_ROUTES));

app.use(router);

app.listen(8080, () => {
  console.log('Node app runs on PORT 8080');
});
