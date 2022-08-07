module.exports = (err, req, res, _next) => {
  if (err.isJoi) {
    const { details } = err;

    return res.status(400)
      .json({ message: details[0].message });
  }

  const statusByErrorCode = {
    invalidData: 400,
    conflict: 409,
    notFound: 404,
    unauthorized: 401,
  };

  const status = statusByErrorCode[err.code] || 500;
  
  res.status(status).json({ message: err.message });
};