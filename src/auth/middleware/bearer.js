'use strict';

const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) { next('Invalid Login')}

    const token = req.headers.authorization.split(' ').pop();
    console.log('token', token);
    const validUser = await users.authenticateToken(token);
    console.log('validUser', validUser);

    req.user = validUser;
    req.token = validUser.token;
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }
};
