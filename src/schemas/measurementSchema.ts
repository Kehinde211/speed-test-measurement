import z = require("zod");

const measurementSchema = z.object({
    id: z.string().uuid(),
    download_mbps: z.number().min(0),
    upload_mbps: z.number().min(0),
    pingMs: z.number()
})

export type MeasurementSchema = z.infer<typeof measurementSchema>

