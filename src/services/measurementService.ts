// import { Measurement, MeasurementStatus } from "../models/measurementModel";
import { prisma } from "../lib/prisma"
// import { createAMeasurement } from "../controllers/measurementController"

// interface Measurement {
//     id: string,
//     download_mbps: number,
//     upload_mbps: number,
//     pingMs: number,
//     // status: MeasurementStatus,
//     createdAt: Date,
// }

export const getAllMeasurement = async () => {
    const measurementDetails = await prisma.Measurement.findMany()
    return measurementDetails;
}

export const getLatestMeasurement = async () => {
    const latestMeasurement = await prisma.Measurement.findFirst({
        orderBy: {
            id: "asc"
        },
    });
    return latestMeasurement;
}

export const getMeasurementStats = async () => {
    const measurementStats = await prisma.Measurement.findMany()
    return measurementStats;
}

export const getASingleMeasurement = async () => {
    const SingleMeasurement = await prisma.Measurement.findUnique({
        where: {
            id: 1,
        }
    })
}

export const createAMeasurement = async (download_mbps: string, upload_mbps: string, ping_ms: number) => {
    const newMeasurement = await prisma.Measurement.create({
        data: {
            download_mbps: download_mbps,
            upload_mbps: upload_mbps,
            ping_ms: ping_ms,
        }
    })
    return newMeasurement;
}

export const deleteMeasurement = async (id: number) => {
    const deletedMeasurement = await prisma.Measurement.delete({
        where: {
            id: id,
        } 
    })
    return deletedMeasurement;
}