"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import cors from "cors";
// import morgan from "morgan";
// import createHttpError, { isHttpError } from "http-errors";
// import session from "express-session";
// import MongoStore from "connect-mongo";
// import cookieParser from "cookie-parser"
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "../.env" });
// import noteRoutes from "./dRoutes/noteRoutes";
// import userRouter from "./dRoutes/userRoutes";
// import { VerifySession } from "./middleware/verifySessionCookie";
// import path from 'path';
// import  { verifyToken } from "./middleware/verifyJwtCookie";
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
exports.default = app;
