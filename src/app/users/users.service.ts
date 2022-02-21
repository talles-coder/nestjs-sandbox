import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/updated-user.dto';
import { Users } from './users.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users)
        private usersRepository: typeof Users
    ){}

    async findAll(){
        return await this.usersRepository.findAll();
    } 

    async findOneOrFail(email: string){
        try {
            return await this.usersRepository.findOne({ where : { email: email}});
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async create(data: Users) {
        this.usersRepository.create(data);
    }

    async update(email: string, data: UpdateUserDto){
        return this.usersRepository.update(data, {
            where: {
                email : email,
            }
        });
    }

    async destroy(email: string){
        await this.findOneOrFail(email);
        const expense: Users = await this.findOneOrFail(email);
        expense.destroy();
    }
}
