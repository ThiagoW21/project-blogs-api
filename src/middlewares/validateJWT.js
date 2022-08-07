require('dotenv').config();

const jwt = require('jsonwebtoken');

const { User } = require('../database/models');

const secret = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next({ code: 'unauthorized', message: 'Token not found' }); 
  }

  try {
    const { data: { email, password } } = jwt.verify(token, secret);

    const user = await User.findOne({ where: { email, password } });

    if (!user) throw Error;

    req.user = user;
    
    next();
  } catch (err) {
    return next({ code: 'unauthorized', message: 'Expired or invalid token' });
  }
};
