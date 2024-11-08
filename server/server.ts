import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';

import { handleRequest } from 'lib/handleRequest';
import { handleErrors } from 'lib/handleErrors';

const app = express();

app.use(cookieParser());

const appRoutes = ['/', '/about', '/profile/', '/articles', '/articles/'];

app.use('/static', express.static(path.join(__dirname, '../client')));

const router = express.Router();

router.use('/', (req, res) => handleRequest(req.url, res, req, appRoutes));

app.use(router);

app.listen(8080, () => {
  console.log('Node app runs on PORT 8080');
});
