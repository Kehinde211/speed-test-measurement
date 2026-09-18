// import { Measurement, MeasurementStatus } from "../models/measurementModel";
import prisma from "../lib/prisma";
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
    const measurementDetails = await prisma.measurement.findMany()
    return measurementDetails;
}

export const getLatestMeasurement = async () => {
    const latestMeasurement = await prisma.measurement.findFirst({
        orderBy: {
            id: "asc"
        },
    });
    return latestMeasurement;
}

export const getMeasurementStats = async () => {
    const measurementStats = await prisma.measurement.findMany()
    return measurementStats;
}

export const getASingleMeasurement = async (id: string ) => {
    const SingleMeasurement = await prisma.measurement.findUnique({
        where: {
            id: id,
        }
    })
    return SingleMeasurement;
}

export const createAMeasurement = async (download_mbps: number, upload_mbps: number, ping_ms: number) => {
    const newMeasurement = await prisma.measurement.create({
        data: {
            download_mbps: download_mbps,
            upload_mbps: upload_mbps,
            ping_ms: ping_ms,
        }
    })
    return newMeasurement;
}

export const deleteMeasurement = async (id: string) => {
    const deletedMeasurement = await prisma.measurement.delete({
        where: {
            id: id,
        } 
    })
    return deletedMeasurement;
}