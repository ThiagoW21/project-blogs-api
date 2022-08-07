const authService = require('../services/authService');

module.exports = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const token = await authService.login(email, password);

  if (token.error) return next(token.error);

  return res.status(200).json({ token });
};
