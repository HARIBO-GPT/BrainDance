"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const UserRouter_1 = require("./User/UserRouter");
const ProjectRouter_1 = require("./Project/ProjectRouter");
const QuizRouter_1 = require("./Quiz/QuizRouter");
const KeywordRouter_1 = require("./Keyword/KeywordRouter");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use('/api/user', UserRouter_1.UserRouter);
app.use('/api/project', ProjectRouter_1.ProjectRouter);
app.use('/api/quiz', QuizRouter_1.QuizRouter);
app.use('/api/keyword', KeywordRouter_1.KeywordRouter);
app.get("/test", (req, res) => {
    res.send("api connect test complete!");
});
app.listen(PORT, () => {
    console.log(`✅Server listenting on http://localhost:${PORT} 🚀 `);
});
