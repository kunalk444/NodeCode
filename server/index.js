import express from "express";
import "dotenv/config";
import authRouter from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import problemRouter from "./routes/problems.js";
import { authMiddleware } from "./services/middleware.js";
import userRouter from "./routes/user.js";
import { connectDB } from "./mongoconnect.js";

process.on("unhandledRejection", err => {
    console.error(err);
    process.exit(1);
});


const port = process.env.PORT;

const app = express();

await connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://nodecode-delta.vercel.app",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    if (origin.endsWith(".vercel.app")) {
      return callback(null, true);
    }

    return callback(null, false);
  },
  credentials: true,
}));


app.use("/auth", authRouter);
app.use("/viewproblems", problemRouter);

app.use(authMiddleware);
app.use("/user", userRouter);


app.listen((process.env.PORT || port), () => {
    console.log(`server running on port ${port}`);
});



