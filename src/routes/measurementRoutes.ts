import Router = require("express")
import { getAllMeasurement, getASingleMeasurement, createAMeasurement, deleteAMeasurement, getLatestMeasurement, getMeasurementStats } from "../controllers/measurementController"

const measurementRouter = Router()

measurementRouter.get("/api/measurements", getAllMeasurement)
measurementRouter.get("/api/measurement/:id", getASingleMeasurement)
measurementRouter.post("/api/measurements", createAMeasurement)
measurementRouter.delete("/api/measurments/:id", deleteAMeasurement)
measurementRouter.get("/api/measurements/latest", getLatestMeasurement)
measurementRouter.get("/api/measurement/stats", getMeasurementStats)

module.exports = measurementRouter;