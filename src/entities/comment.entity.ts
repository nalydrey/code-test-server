import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinTable, OneToMany, OneToOne, JoinColumn } from "typeorm"
import { User } from "./user.entity"
import { File } from "./file.entity"



@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    @OneToOne(()=>File, {eager: true})
    @JoinColumn()
    file: File
    
    @ManyToOne(()=>User, (user) => user.comments, {eager: true} )
    user: User

    @ManyToOne(()=>Comment, (comment) => comment.reply, {onDelete: 'CASCADE'})
    parent: Comment

    @OneToMany(()=>Comment, comment => comment.parent, {onDelete: 'CASCADE'}) 
    reply: Comment[]
}