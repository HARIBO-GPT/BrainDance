import express from 'express'
import { tokenToUid } from '../auth/auth';
import { postProject } from '../Project/ProjectController';

export const ProjectRouter = express.Router();

// ProjectRouter.route('/:uid').get(tokenToUid, getUserInfo);
ProjectRouter.route('/').post(tokenToUid, postProject);

