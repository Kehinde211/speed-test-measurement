import { Router } from "express"
import { getAllMeasurement, getASingleMeasurement, createAMeasurement, deleteAMeasurement, getLatestMeasurement, getMeasurementStats } from "../controllers/measurementController"

const measurementRouter = Router()

measurementRouter.get("/measurements", getAllMeasurement)
measurementRouter.get("/measurement/:id", getASingleMeasurement)
measurementRouter.post("/measurements", createAMeasurement)
measurementRouter.delete("/measurements/:id", deleteAMeasurement)
measurementRouter.get("/measurements/latest", getLatestMeasurement)
measurementRouter.get("/measurement/stats", getMeasurementStats)

export default measurementRouter;