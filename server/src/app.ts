
import express, { Express, NextFunction, Request, Response } from "express";
// import cors from "cors";
// import morgan from "morgan";

// import createHttpError, { isHttpError } from "http-errors";
// import session from "express-session";
// import MongoStore from "connect-mongo";
// import cookieParser from "cookie-parser"

import dotenv from "dotenv";
dotenv.config({ path: "../.env" });


// import noteRoutes from "./dRoutes/noteRoutes";
// import userRouter from "./dRoutes/userRoutes";
// import { VerifySession } from "./middleware/verifySessionCookie";

// import path from 'path';
// import  { verifyToken } from "./middleware/verifyJwtCookie";

const app: Express = express();


app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});



export default app;