import express from "express"
import {config} from 'dotenv'
import { myDataSource } from "./data-source/data-source.init"
import { commentRouter } from "./routes/comment.route"
import { RootRouter } from "./routes/root.route"

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
app.use(express.json())
new RootRouter(app).init()

app.listen(process.env.APP_PORT, () => {
    console.log('server started');
    
})