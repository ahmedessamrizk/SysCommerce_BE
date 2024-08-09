import { roles } from '../middleware/auth.js';
import * as usersService from '../modules/users/users.service.js';

export const makeAdmin = async () => {
  const email = process.env.SUPER_ADMIN_EMAIL;
  const user = await usersService.getUser({ email }, 'email');
  if (!user) {
    await usersService.createUser({
      userName: process.env.SUPER_ADMIN_USERNAME,
      email: process.env.SUPER_ADMIN_EMAIL,
      password: process.env.SUPER_ADMIN_PASSWORD,
      role: roles.SuperAdmin,
      isConfirmed: true
    });
  }
  console.log('superAdmin is intialized');
};
