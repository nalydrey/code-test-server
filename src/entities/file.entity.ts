import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./comment.entity";

@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    size: number

    @OneToOne(()=>Comment)
    comment: Comment

    @CreateDateColumn()
    createdDate: Date
}