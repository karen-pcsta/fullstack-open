require("dotenv").config()
require("express-async-errors")
const express = require("express")
const app = express()
const cors = require("cors")
const { blogListsRouter, exportedList } = require("./controllers/blogLists")
const config = require("./utils/config")
const middleware = require("./utils/middleware")
const logger = require("./utils/logger")
const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB")
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/blogs", blogListsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
