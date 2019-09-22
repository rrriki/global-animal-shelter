import {BadRequestException, Module} from '@nestjs/common';
import {MulterModule} from '@nestjs/platform-express';
import {PassportModule} from '@nestjs/passport';
import {MongooseModule} from '@nestjs/mongoose';
import {PetSchema} from './pet.schema';
import {PetService} from './pet.service';
import {PetController} from './pet.controller';
import * as multerS3 from 'multer-s3';
import {Configuration} from '../configuration';

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt', session: false}),
        MongooseModule.forFeature([{name: 'Pet', schema: PetSchema}]),
        MulterModule.register({
            storage: multerS3(Configuration.getMulterOptions('pets')),
        }),
    ],
    controllers: [PetController],
    providers: [PetService],
})

export class PetModule {
}
