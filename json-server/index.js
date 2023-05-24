/* eslint-disable consistent-return */
const fs = require('fs');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const path = require('path');

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

// Нужно для небольшой задержки, чтобы запрос проходил не мнгновенно, имитация бека типо
server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 800);
  });
  next();
});

// чек аус
server.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: 'AUTH ERROR' });
  }
  next();
});

server.use(jsonServer.defaults());
server.use(router);

// эндпоинт для логинга
server.use((req, res, next) => {
  const { username, password } = req.body;
  const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'utf-8'));
  const { users } = db;

  const userFormBd = users.find(
    (user) => user.username === username && user.password === password,
  );

  if (userFormBd) {
    return res.json(userFormBd);
  }

  return res.status(403).json({ message: 'AUTH ERROR' });
});

server.listen(8000, () => {
  console.log('server is running on port 8000');
});
