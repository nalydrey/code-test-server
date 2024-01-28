import { In, IsNull, Repository } from "typeorm"
import { myDataSource } from "../data-source/data-source.init"
import { Comment } from "../entities/comment.entity"
import { CreateCommentDto } from "../dto/create-comment.dto"
import { UserService, userService } from "./user.service"
import { FileService, fileService } from "./file.service"
import { QueryDto } from "../dto/query.dto"


export class CommentService {

    constructor(
        private repo: Repository<Comment>, 
        private userService: UserService,
        private fileService: FileService
        ){

    }

    async findSub(ids: number[], query?: QueryDto){

        const limit = 2
        let page = query?.page || 0
        const skip = page*limit
        
        const arr: Comment[] = []
        const comments = await this.repo.findAndCount({
            where: {id: In(ids)},
            relations: {
                reply: true,
                parent: true
            },
            order: query?.sort,
            skip: skip,
            take: limit,
        })

        await Promise.all(comments[0].map(async comment => {
            const subIds = comment.reply.map(comment => comment.id)
            if(subIds.length){
                const findComments = await this.findSub(subIds)
                comment.reply = findComments[0]
            }
        }))

        return comments
    }

    async getMany(query: QueryDto) {
        console.log(query);
        
        const comments = await this.repo.find({
            where: {
                parent: IsNull()
            },
        })
        
        const ids = comments.map(comment => comment.id)
        return this.findSub(ids, query)
    }
    
    async createNew(createCommentDto: CreateCommentDto, parentComment?: Comment | null) {
        const {avatar, email, homePage, text, userName, fileId} = createCommentDto
        const comment = new Comment()
        
        if(fileId){
           const file = await this.fileService.getDocumentById(fileId)
           console.log('file', file);
           
           if(file) comment.file = file
        }
        const user = await this.userService.createNew({
            avatar, email, homePage, userName 
        })
        
        comment.user = user
        comment.text = text

        if(parentComment) {
            comment.parent = parentComment
        }

        return this.repo.save(comment)
    }

    async createNewReply(createCommentDto: CreateCommentDto, id: number){
        const parentComment = await this.repo.findOneBy({ id })
        return this.createNew(createCommentDto, parentComment)
    }

    async deleteById(id: number) {
        const comment = await this.repo.findOneBy({id})
        await this.repo.delete(id)
        return comment
    }
}

export const commentService = new CommentService(myDataSource.getRepository(Comment), userService, fileService)