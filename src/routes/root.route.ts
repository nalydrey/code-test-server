import { Express } from "express";
import { commentRouter } from "./comment.route";
import { fileRouter } from './file.route'


export class RootRouter {
    constructor (private app: Express, private apiName: string = 'api') {}

    init () {
        this.app.use(`/${this.apiName}/comments`, commentRouter)
        this.app.use(`/${this.apiName}/file`, fileRouter)
    }
}