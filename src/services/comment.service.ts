import { In, Repository } from "typeorm"
import { myDataSource } from "../data-source/data-source.init"
import { Comment } from "../entities/comment.entity"
import { CreateCommentDto } from "../dto/create-comment.dto"


export class CommentService {

    constructor(private repo: Repository<Comment>){

    }

    async findSub(ids: number[]){
        const arr: Comment[] = []
        const comments = await this.repo.find({
            where: {id: In(ids)},
            relations: {
                reply: true
            }
        })

        await Promise.all(comments.map(async comment => {
            const subIds = comment.reply.map(comment => comment.id)
            if(subIds.length){
                comment.reply = await this.findSub(subIds)
            }
        }))

        return comments
    }

    async getMany() {
        const comments = await this.repo.find()
        const ids = comments.map(comment => comment.id)
        return this.findSub(ids)
    }
    
    createNew(createCommentDto: CreateCommentDto) {
        const comment = new Comment()
        Object.assign(comment, createCommentDto)
        return this.repo.save(comment)
    }

    async createNewReply(createCommentDto: CreateCommentDto, id: number){
        console.log(id, createCommentDto);
        
        createCommentDto.isReply = true
        const comment = await this.repo.findOne({
            where: {id},
            relations: {
                reply: true
            }

        })
        const newComment = await this.createNew(createCommentDto)
        console.log('!');
        if(comment){
            comment.reply.push(newComment)
            await this.repo.save(comment)
        }
        console.log('!!');
        return comment
    }

    async deleteById(id: number) {
        const comment = await this.repo.findOneBy({id})
        await this.repo.delete(id)
        return comment
    }
}

export const commentService = new CommentService(myDataSource.getRepository(Comment))