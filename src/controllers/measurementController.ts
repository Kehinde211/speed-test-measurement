import type { Request, Response, NextFunction } from "express"
import * as MeasurementService from "../services/measurementService"

export const getAllMeasurement = async (req: Request, res: Response, next: NextFunction ) => {
    try {
        const measurementDetails = await MeasurementService.getAllMeasurement()

        if (!measurementDetails) {
            return res.status(400).json({
                message: "Measurement Details not found"})
        }
        return res.status(200).json({
            message: "All Measurement Details retrieved successfully",
            data: measurementDetails,
            success: true,
        })
    } catch (err) {
        next(err)
    }
}

export const getASingleMeasurement = () => {

}

export const createAMeasurement = () => {

}

export const deleteAMeasurement = () => {

}

export const getLatestMeasurement = () => {

}

export const getMeasurementStats = () => {

}