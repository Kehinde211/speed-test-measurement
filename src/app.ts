import express = require("express");
import cors = require("cors")
import { measurementRouter }  from "./routes/measurementRoutes"
import { router } from "./routes/auth.Router"

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api", measurementRouter)
app.use("/login", router),
app.use("/signup", router)

const PORT = process.env.port || 3000

app.listen(PORT, (error) => {
    if (error) {
        throw error
    }
    console.log(`Server running at port ${PORT} `)
})
