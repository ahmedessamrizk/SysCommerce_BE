import mongoose from 'mongoose';
import { roles } from '../../src/middleware/auth.js';

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    min: [3, 'Length of userName must be more than 3'],
    max: [20, 'Length of userName must be more than 20']
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: roles, default: roles.User },
  isConfirmed: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false }
});

export const userModel = mongoose.model('User', userSchema);
