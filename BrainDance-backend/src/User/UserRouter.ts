import express from 'express';
import { tokenToUid } from '../auth/auth';
import { getUserInfo, postUser } from '../User/UserController';

export const UserRouter = express.Router();

UserRouter.route('/').get(tokenToUid, getUserInfo);
UserRouter.route('/').post(tokenToUid, postUser);

