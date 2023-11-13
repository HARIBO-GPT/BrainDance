import express from 'express';
import { tokenToUid } from '../auth/auth';
import { postKeyword } from '../Keyword/KeywordController';

export const KeywordRouter = express.Router();

// 요기
KeywordRouter.route('/').post(tokenToUid, postKeyword);
