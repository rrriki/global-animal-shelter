import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from '../typing/user.interface';
import {CreateUserDTO} from '../typing/dto/createUser.dto';
import {logPerformance} from '../shared/log-performance.decorator';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>) { }

    @logPerformance((instance, args) => args[0].email)
    async createUser(user: CreateUserDTO): Promise<User> {
        const newUser = await new this.userModel(user);
        return await newUser.save();

    }

    @logPerformance((instance, args) => args[0])
    async findUserByEmail(email: string): Promise<any> {
        return await this.userModel.findOne({email});
    }
}
