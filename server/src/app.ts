
import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

import createHttpError, { isHttpError } from "http-errors";
// import session from "express-session";
// import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser"

import dotenv from "dotenv";
dotenv.config({ path: "../.env" });


// import noteRoutes from "./dRoutes/noteRoutes";
// import userRouter from "./dRoutes/userRoutes";
// import { VerifySession } from "./middleware/verifySessionCookie";

import path from 'path';
// import  { verifyToken } from "./middleware/verifyJwtCookie";

const app: Express = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.enable('trust proxy')

// const dirname = path.resolve();

const dirname = path.dirname(path.resolve());
// const parentDirname = path.dirname(dirname);
// const newPath = path.join(parentDirname, path.basename(dirname));
// console.log(newPath);

// use the frontend app
app.use(express.static(path.join(dirname, "/client/dist")));
console.log(dirname)
app.get('*', (req, res) => {
    res.sendFile(path.join(dirname, '/client/dist/index.html'));
});

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

// end point middleware
app.use((res, req, next) => {
    next(createHttpError(404, "endpoint not found"))
});

// error handler middleware
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "an unknown error occurred";
    let statusCode = 500;

    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});


export default app;