require('dotenv').config()
const express = require('express')
const mongoose = require("mongoose")
const { router } = require("./router.js")
const app = express()
app.use(express.json());
app.use(router)
const PORT = process.env.PORT || 5050
const mongoUrl = process.env.mongo_url
async function startApp() {
    try {
        await mongoose.connect(process.env.mongo_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true

        })
        app.listen(PORT, () => {
            console.log("App Started on post", PORT)
        })

    } catch (e) {
        console.log("Произошла ошибка при запуске приложение ", e.message)
        process.exit(1)
    }
}

startApp()