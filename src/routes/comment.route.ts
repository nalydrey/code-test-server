import {Router} from 'express'
import { CommentController, commentController } from '../controllers/comment.controller';

export const commentRouter = Router()

commentRouter.get('/', commentController.getMany.bind(commentController))

commentRouter.post('/', commentController.create.bind(commentController))

commentRouter.post('/:id', commentController.addReply.bind(commentController))

commentRouter.delete('/:id', commentController.delete.bind(commentController))