const express = require("express")
const path = require("path")
const fs = require("fs")
const cors = require("cors")
const post_route = require("./routes/post_routes")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(express.static(path.join(__dirname, "public/")))

// route
app.use("/api", post_route)

//listener
app.listen(PORT, "0.0.0.0", ()=>{
    console.info("server berjalan")
})