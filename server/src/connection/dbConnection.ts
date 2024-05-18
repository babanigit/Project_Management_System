import { NextFunction } from "express"
import mongoose from "mongoose";


const DB: string | undefined = process.env.MONGODB_URI;
if (!DB) {
    throw new Error("Database connection string is not provided. -b");
}

const dbConnection = async (next: NextFunction) => {

    try {

        const connect = await mongoose.connect(DB);
        console.log(
            "💚[database connected]:",
            connect.connection.host,
            connect.connection.name
        );

    } catch (error) {
        next(error)
    }
}

export default dbConnection