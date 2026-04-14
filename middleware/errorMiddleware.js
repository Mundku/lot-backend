const notFound = (req, res, next) => {
  const error = new Error(`Олдсонгүй - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({ error: err.message });
};

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    message = 'Буруу ID формат';
    statusCode = 400;
  }

  res.status(statusCode).json({
    error: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };