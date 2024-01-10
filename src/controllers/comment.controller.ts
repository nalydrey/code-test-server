import { Response, Request } from "express";
import { CommentService, commentService } from "../services/comment.service";

export class CommentController {

    constructor(private commentService: CommentService){}

    async getMany(req: Request, res: Response){
        const comments = await this.commentService.getMany()
        res.json({
            comments
        })
    }
    
    getOne(req: Request, res: Response){

    }

    async create(req: Request, res: Response){
        const comment = await this.commentService.createNew(req.body)
        res
            .status(201)
            .json({
                comment
            })
    }

    async delete(req: Request, res: Response){
        const comment = await this.commentService.deleteById(+req.params.id)
        res
            .status(200) 
            .json({
                comment
            })
    }  
    
    async addReply(req: Request, res: Response){
        const comment = await this.commentService.createNewReply(req.body, +req.params.id)
        res
        .status(201)
        .json({
            comment
        })
    }

    update(req: Request, res: Response){

    }

}

export const commentController = new CommentController(commentService)