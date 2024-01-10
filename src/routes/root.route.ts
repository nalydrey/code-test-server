import { Express } from "express";
import { commentRouter } from "./comment.route";

export class RootRouter {
    constructor (private app: Express) {}

    init () {
        this.app.use('/comments', commentRouter)
    }
}