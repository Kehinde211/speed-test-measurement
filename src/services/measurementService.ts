// import { Measurement, MeasurementStatus } from "../models/measurementModel";
import 
import { prisma } from "../lib/prisma"

interface Measurement {
    id: string,
    download_mbps: number,
    upload_mbps: number,
    pingMs: number,
    // status: MeasurementStatus,
    createdAt: Date,
}

export const getAllMeasurement = async () => {
    const measurementDetails = await prisma.Measurement.findMany({

    })
    return measurementDetails;
}

export const getLatestMeasurement = () => {

}