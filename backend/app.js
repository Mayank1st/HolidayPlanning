import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectdb.js";
import passport from "passport";
import userRoutes from "./routes/userRoutes.js";
import "./config/passport-jwt-strategy.js";
const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
// This will solve CORS Policy Error
const corsOptions = {
  origin: process.env.FRONTEND_HOST, // Allow requests from the frontend
  credentials: true, // Allow sending cookies and credentials
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS", // Include OPTIONS for preflight
  allowedHeaders: "Content-Type,Authorization", // Headers allowed
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

// Handle OPTIONS preflight requests
app.options('*', cors(corsOptions));

// Apply CORS to all routes
app.use(cors(corsOptions));

// Database Connection
connectDB(DATABASE_URL);

// JSON
app.use(express.json());

// Passport Middleware
app.use(passport.initialize());

// Cookie Parser
app.use(cookieParser());

// Load Routes
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
