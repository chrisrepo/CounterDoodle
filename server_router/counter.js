const express = require('express');

const authHelper = require('../server_libs/authHelper');

var counterRouter = express.Router();

counterRouter.all('*', authHelper.verifyJWT_Middleware);

counterRouter.post('/nextCount', (req, res) => {
  let newValue = increment(req.body.count);
  res.send({increment: newValue});
})

function increment(val) {
  return val >= 1 ? val * 2 : 1;
}

module.exports = counterRouter;
