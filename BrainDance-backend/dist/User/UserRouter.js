"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../auth/auth");
const UserController_1 = require("../User/UserController");
exports.UserRouter = express_1.default.Router();
exports.UserRouter.route('/:uid').get(auth_1.tokenToUid, UserController_1.getUserInfo);
exports.UserRouter.route('/').post(auth_1.tokenToUid, UserController_1.postUser);
