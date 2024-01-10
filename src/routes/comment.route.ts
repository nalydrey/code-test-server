import {Router} from 'express'
import { CommentController, commentController } from '../controllers/comment.controller';
import { validateAndTransform } from '../middlewares/validator';
import { CreateCommentDto } from '../dto/create-comment.dto';

export const commentRouter = Router()

commentRouter.get('/',  commentController.getMany.bind(commentController))

commentRouter.post('/', validateAndTransform(CreateCommentDto), commentController.create.bind(commentController))

commentRouter.post('/:id', commentController.addReply.bind(commentController))

commentRouter.delete('/:id', commentController.delete.bind(commentController))