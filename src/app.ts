import express from "express";
import "dotenv/config";
import session from "express-session";
import passport from "passport";
import "./config/passport";
import cors from "cors"
import measurementRouter from "./routes/measurementRoutes"
import authRouter  from "./routes/auth.Router"
import { Request, Response, NextFunction } from "express";

const app = express()
app.use(express.json())
app.use(cors())
app.use(session({
    secret: process.env.SESSION_SECRET || "dev-secret-change-in-production",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/measurement', measurementRouter)

app.use('/api/auth', authRouter)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal server error",
        success: false,
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
    if (error) {
        throw new Error("Failed to start server")
    }
    console.log(`Server running at port ${PORT} `)
})
