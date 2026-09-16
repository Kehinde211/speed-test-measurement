-- CreateEnum
CREATE TYPE "MeasurementStatus" AS ENUM ('SUCCESS', 'FAILED', 'TIMEOUT');

-- CreateTable
CREATE TABLE "Measurement" (
    "id" TEXT NOT NULL,
    "download_mbps" DOUBLE PRECISION,
    "upload_mbps" DOUBLE PRECISION NOT NULL,
    "ping_ms" INTEGER NOT NULL,
    "latency" INTEGER NOT NULL,
    "error_message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Measurement_pkey" PRIMARY KEY ("id")
);
