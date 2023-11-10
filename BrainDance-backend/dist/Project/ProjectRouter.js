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
exports.ProjectRouter.route('/').get(auth_1.tokenToUid, ProjectController_1.getProjects);
exports.ProjectRouter.route('/:projectId').get(auth_1.tokenToUid, ProjectController_1.getProject);
exports.ProjectRouter.route('/').post(auth_1.tokenToUid, ProjectController_1.postProject);
