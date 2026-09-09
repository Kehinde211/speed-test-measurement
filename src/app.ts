import express = require("express");
import cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.port || 3000

app.listen(PORT, (error) => {
    if (error) {
        throw error
    }
    console.log(`Server running at port ${PORT} `)
})
