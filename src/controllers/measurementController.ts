import type { Request, Response, NextFunction } from "express"
import * as MeasurementService from "../services/measurementService"
import { id } from "zod/v4/locales"

export const getAllMeasurement = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const measurementDetails = await MeasurementService.getAllMeasurement()

        if (!measurementDetails) {
            return res.status(400).json({
                message: "Measurement Details not found",
                success: false,
            })
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

export const getASingleMeasurement = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id  = req.params;
    const singleMeasurement = await MeasurementService.getASingleMeasurement(Number(id))
    return res.status(200).json({
        data: singleMeasurement,
        success: true,
    });
    } catch (err) {
        next(err)
    }
}

export const createAMeasurement = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { download_mbps, upload_mbps, ping_ms } = req.body;
        const newMeasurementCreated = await MeasurementService.createAMeasurement(download_mbps, upload_mbps, ping_ms )

        if (!newMeasurementCreated) {
            return res.status(400).json({
                success: false,
                message: "New measurement failed to be created",
            })
        }
        return res.status(200).json({
            success: true,
            message: "New measurement successfully created",
            data: newMeasurementCreated,
        })
    } catch (err) {
        next(err)
    }
}

export const deleteAMeasurement = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const deletedMeasurement = await MeasurementService.deleteMeasurement((id));

    if (!deletedMeasurement) {
        return res.status(400).json({
            success: false,
            message: "Deleted Measurement could not be found"
        })
    }
    return res.status(200).json({
        success: true,
        message: "Measurement successfully deleted",
        data: deletedMeasurement,
    })
    } catch (err) {
        next(err) 
    } 
}

export const getLatestMeasurement = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const latestMeasurement = await MeasurementService.getLatestMeasurement()

        if (!latestMeasurement || latestMeasurement.id === "0") {
            return res.status(400).json({
                message: "Latest Measurement not found"
            })
        }
        return res.status(200).json({
            message: "Latest Measurement retrieved successfully",
            data: latestMeasurement,
            success: true,
        })
    } catch (err) {
        next(err)
    }
}

export const getMeasurementStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const measurementStats = await MeasurementService.getMeasurementStats()

        if (!measurementStats) {
            return res.status(400).json({
                success: false,
                message: "Measurement Stats data retrieved unsuccessfully"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Measurement Stats data retrieved successfully"
        })
    } catch (err) {
        next(err)
    }
}

