import express from 'express'
import { tokenToUid } from '../auth/auth';
import { postProject, getProjects } from '../Project/ProjectController';

export const ProjectRouter = express.Router();

ProjectRouter.route('/').get(tokenToUid, getProjects);
ProjectRouter.route('/').post(tokenToUid, postProject);

