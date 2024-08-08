import jwt from 'jsonwebtoken';
import { getUser } from '../modules/users/users.service.js';
import { createResponse } from '../utils/createResponse.js';

export const roles = {
  SuperAdmin: 'SuperAdmin',
  Admin: 'Admin',
  User: 'User'
};

export const auth = (accessRoles = []) => {
  return async (req, res, next) => {
    try {
      const { token } = req.cookies;
      if (!token) {
        return res.status(401).json(createResponse(401, null, 'Unauthorized'));
      }

      //decode token
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      if (!decoded?.id) {
        return res.status(400).json(createResponse(400, null, 'Invalid token'));
      }

      //check if user is exist
      const user = await getUser(
        { _id: decoded.id, isDeleted: { $in: [false, null] } },
        'userName role'
      );
      if (!user) {
        return res
          .status(404)
          .json(createResponse(404, null, 'Invalid user id'));
      }

      //check if user has access to the route
      if (!accessRoles.includes(user.role)) {
        return res.status(403).json(createResponse(403, null, 'Forbidden'));
      }

      // Add user to request object
      req.user = user;
      next();
    } catch (error) {
      return res.status(400).json(createResponse(400, error.message, 'error'));
    }
  };
};
