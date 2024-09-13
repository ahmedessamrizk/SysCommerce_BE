import { createResponse } from '../utils/createResponse.js';

//This function to avoid writing try catch in its end point
export const asyncHandler = fn => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      return next(Error(error.message, { cause: error.cause }));
    }
  };
};

export const globalErrorHandling = (err, req, res, next) => {
  if (err) {
    console.log(err)
    if (process.env.MODE === 'DEV') {
      return res
        .status(err['cause'] || 500)
        .json(createResponse(err['cause'] || 500, err.stack, err.message));
    } else {
      return res
        .status(err['cause'] || 500)
        .json(createResponse(err['cause'] || 500, null, err.message));
    }
  }
};
