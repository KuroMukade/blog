import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';

import { handleRequest } from 'lib/handleRequest';
import { handleErrors } from 'lib/handleErrors';

const app = express();

app.use(cookieParser());

app.use('/static', express.static(path.join(__dirname, '../client')));
app.use('/img', express.static(path.join(__dirname, '../server/img')));
const router = express.Router();

// router.use('/', handleErrors((req, res, next) => {
//   handleRequest(req.url, res, req, next);
// }));

router.use('/', handleErrors((req, res, next) => {
  if (req.url.match(/\.(png|jpg|jpeg|gif|svg)$/)) {
    return next();
  }
  handleRequest(req.url, res, req, next);
}));

app.use(router);

app.listen(8080, () => {
  console.log('Node app runs on PORT 8080');
});
