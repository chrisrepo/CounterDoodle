const express = require('express');
var authRouter = express.Router();

const authHelper = require('../server_libs/authHelper');

const stubUser = {
  user: 'test',
  password: 'test'
}

authRouter.post('/login', (req, res) => {
  let {user, password} = req.body;
  if (user === stubUser.user && password === stubUser.password) {
    let resData = {
      success: true,
      token: authHelper.createJWToken({
          sessionData: user,
          maxAge: 3600
        })
    }
    res.status(200).send(resData);
  } else {
    res.status(401).json("Invalid email or password");
  }
})

module.exports = authRouter;
