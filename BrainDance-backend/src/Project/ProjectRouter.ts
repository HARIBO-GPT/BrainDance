import express from 'express'
import { tokenToUid } from '../auth/auth';
import { postProject, getProjects, getProject } from '../Project/ProjectController';

export const ProjectRouter = express.Router();

ProjectRouter.route('/').get(tokenToUid, getProjects);
ProjectRouter.route('/:projectId').get(tokenToUid, getProject);
ProjectRouter.route('/').post(tokenToUid, postProject);

