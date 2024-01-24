import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Comment } from "./comment.entity"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    avatar: string

    @Column()
    userName: string
  
    @Column({
        nullable: true
    })
    homePage: string
   
    @Column({unique: true})
    email: string

    @OneToMany(()=>Comment, (comment)=>comment.user)
    comments: Comment[]
}