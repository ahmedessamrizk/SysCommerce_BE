const dataMethods = ['body', 'params', 'query', 'headers'];
import { createResponse } from '../utils/createResponse.js';
import { asyncHandler } from '../utils/errorHandlingService.js';

export const validation = schema => {
  return asyncHandler(async (req, res, next) => {
    try {
      const errList = [];

      await Promise.all(
        dataMethods.map(async method => {
          if (schema && schema[method]) {
            try {
              await schema[method].validate(req[method], { abortEarly: false });
            } catch (validationError) {
              errList.push(...validationError.errors);
            }
          }
        })
      );
      if (errList.length) {
        return res
          .status(400)
          .json(createResponse(400, errList, 'validation error'));
      } else {
        return next();
      }
    } catch (error) {
      console.log(error);
    }
  });
};
