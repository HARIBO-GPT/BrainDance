"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenToUid = void 0;
const firebase_1 = require("./firebase");
const tokenToUid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers.authorization !== null && req.headers.authorization !== undefined) {
        const token = req.headers.authorization.split('Bearer ')[1];
        if (token !== undefined) {
            try {
                const decodedToken = yield firebase_1.admin.auth().verifyIdToken(token);
                req.uid = decodedToken.uid;
                next();
            }
            catch (error) {
                // Handle token verification error here
                res.status(401).send('Unauthorized1');
            }
        }
        else {
            res.status(401).send('Unauthorized2');
        }
    }
    else {
        res.status(401).send('Unauthorized3');
    }
});
exports.tokenToUid = tokenToUid;
