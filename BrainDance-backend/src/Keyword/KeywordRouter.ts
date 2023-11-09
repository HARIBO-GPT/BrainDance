import express from 'express';
import { tokenToUid } from '../auth/auth';
import { postKeyword } from '../Keyword/KeywordController';

export const KeywordRouter = express.Router();

KeywordRouter.route('/').post(tokenToUid, postKeyword);
