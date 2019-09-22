import {BadRequestException, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from './user.schema';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {MulterModule} from '@nestjs/platform-express';
import * as multerS3 from 'multer-s3';
import {Configuration} from '../configuration';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
        MulterModule.register({
            storage: multerS3(Configuration.getMulterOptions('users')),
        }),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {
}
