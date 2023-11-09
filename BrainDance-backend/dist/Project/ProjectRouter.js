"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../auth/auth");
const ProjectController_1 = require("../Project/ProjectController");
exports.ProjectRouter = express_1.default.Router();
// ProjectRouter.route('/:uid').get(tokenToUid, getUserInfo);
exports.ProjectRouter.route('/').post(auth_1.tokenToUid, ProjectController_1.postProject);
