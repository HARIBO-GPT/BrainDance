"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
app.get("/", (req, res) => {
    res.send("hihi");
});
app.get("/good", (req, res) => {
    res.send("good");
});
app.listen(PORT, () => {
    console.log(`✅Server listenting on http://localhost:${PORT} 🚀 `);
});
