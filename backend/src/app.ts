import express from "express"
import cors from "cors"
import morgan from "morgan"
import corsConfig from "./config/cors.config"

import { errorHandler } from "./middleware/errorHandler.middleware"
import authRouter from "./router/auth.router"

export const app = express()

/* -------------------- Core Middlewares -------------------- */
app.use(cors(corsConfig))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

/* -------------------- Routes -------------------- */
app.use("/api/v1/auth", authRouter)

/* -------------------- Global Error Handler  -------------------- */
app.use(errorHandler)


