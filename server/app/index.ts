import express from 'express';

export const router = express.Router();

router.get('/', async (req, res) => {
  const reactComp = ''; // So that program doesn't break
  res.status(200).render('pages/index', { reactApp: reactComp });
});
