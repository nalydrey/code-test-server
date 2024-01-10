import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinTable, OneToMany } from "typeorm"
import { User } from "./user.entity"

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @Column({default: false})
    isReply: boolean

    @Column()
    userName: string

    @Column()
    email: string

    @Column({nullable: true})
    homePage: string

    @Column()
    text: string

    @ManyToMany(()=>Comment) 
    @JoinTable()
    reply: Comment[]
}