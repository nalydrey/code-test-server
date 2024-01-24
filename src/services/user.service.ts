import { CreateUserDto } from "../dto/user.dto";
import { User } from "../entities/user.entity";
import { myDataSource } from "../data-source/data-source.init";
import { Repository } from "typeorm";


export class UserService {
    constructor(private repo: Repository<User>){

    }

    async createNew(createUserDto: CreateUserDto){

        const existedUser = await this.repo.findOneBy({
            email: createUserDto.email
        })
        
        if(existedUser){
            existedUser.avatar = createUserDto.avatar
            return this.repo.save(existedUser)
        }
        const newUser = new User()
        Object.assign(newUser, createUserDto)
        return this.repo.save(newUser)
    }
}

export const userService = new UserService(myDataSource.getRepository(User))