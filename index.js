import path from "path";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan"
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();
// const PORT = process.env.PORT;

// const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({limit:"30mb",extended: true}));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
	res.send("Welcome to SUBODH CHAT APP SERVER");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
// app.use(express.static(path.join(__dirname, "/frontend/dist")));
const port  = process.env.PORT || 8000;

connectToMongoDB();
server.listen(port, () => {
	console.log(`Server Running on port ${port}`);
});
