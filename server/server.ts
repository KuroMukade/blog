import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';

import { handleRequest } from 'lib/handleRequest';
import { handleErrors } from 'lib/handleErrors';

const app = express();

app.use(cookieParser());

app.use('/static', express.static(path.join(__dirname, '../client')));
app.use('/static', express.static(path.join(__dirname, 'assets')));
const router = express.Router();

router.use('/', handleErrors((req, res) => {
  handleRequest(req.url, res, req);
}));

app.use(router);

app.listen(8080, () => {
  console.log('Node app runs on PORT 8080');
});
