"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../auth/auth");
const QuizController_1 = require("../Quiz/QuizController");
exports.QuizRouter = express_1.default.Router();
exports.QuizRouter.route('/').post(auth_1.tokenToUid, QuizController_1.postQuiz);
exports.QuizRouter.route('/:projectId').get(auth_1.tokenToUid, QuizController_1.getQuizs);
