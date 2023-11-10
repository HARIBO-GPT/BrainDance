import express from 'express'
import { tokenToUid } from '../auth/auth';
import { postQuiz, getQuizs } from '../Quiz/QuizController';

export const QuizRouter = express.Router();

QuizRouter.route('/').post(tokenToUid, postQuiz);
QuizRouter.route('/:projectId').get(tokenToUid, getQuizs);