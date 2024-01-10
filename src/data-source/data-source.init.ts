import { DataSource } from "typeorm"
import {config} from 'dotenv'
import { User } from "../entities/user.entity"
import { Comment } from "../entities/comment.entity"
config()

export const myDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_SERVER,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_BASENAME,
    // entities: ["src/entity/*.js"],
    entities: [User, Comment],
    logging: true,
    synchronize: true,
})

