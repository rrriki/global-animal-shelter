import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { CreateUserDTO } from './createUser.dto';

const logger = new Logger('UserService');

@Injectable()
export class UserService {
    constructor (@InjectModel('User') private userModel: Model<User>) { }

    async createUser (user: CreateUserDTO): Promise<User> {
        logger.log(`Creating new user: ${ JSON.stringify(user) }`);
        // TODO: handle duplicate key error
        const newUser = await new this.userModel(user);
        return await newUser.save();
    }

    async findUserByEmail (email: string): Promise<any> {
        logger.log(`Finding user with email: ${ email }`);
        return await this.userModel.findOne({ email });
    }
}
