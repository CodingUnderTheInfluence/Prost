const { Router } = require('express');

const gTranslateRouter = Router();

gTranslateRouter.get('/', (req, res) => {
  res.send('hello world');
});

module.exports = {
  gTranslateRouter,
};
