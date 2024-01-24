import express from "express"
import {config} from 'dotenv'
import { myDataSource } from "./data-source/data-source.init"
import { RootRouter } from "./routes/root.route"
import cors from 'cors'
import os from 'os'

config()

myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const app = express()
app.use(express.static('uploads'))
app.use(express.static('images'))
app.use(express.json())
app.use(cors())
new RootRouter(app).init()

app.listen(process.env.APP_PORT, () => {
    console.log('server started');
})