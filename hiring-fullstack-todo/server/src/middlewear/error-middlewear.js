import STATUS, { NODE_ENV } from './../constants/constants.js';

// middlewear for handle errors
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === STATUS.SUCCESS ? STATUS.SERVER_ERROR : res.statusCode;
  
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === NODE_ENV.PRODUCTION ? null : err.stack,
  });
};