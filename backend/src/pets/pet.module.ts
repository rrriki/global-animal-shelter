import {BadRequestException, Module} from '@nestjs/common';
import {MulterModule} from '@nestjs/platform-express';
import {PassportModule} from '@nestjs/passport';
import {MongooseModule} from '@nestjs/mongoose';
import {PetSchema} from './pet.schema';
import {PetService} from './pet.service';
import {PetController} from './pet.controller';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import * as path from 'path';
import {Configuration} from '../configuration';

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt', session: false}),
        MongooseModule.forFeature([{name: 'Pet', schema: PetSchema}]),
        MulterModule.register({
            storage: multerS3({
                s3: new AWS.S3({credentials: Configuration.getAWSCredentials()}),
                bucket: 'global-animal-shelter-pets',
                key: (req, file, cb) => {
                    const {user: {id}} = req as any;
                    const ext = path.extname(file.originalname);

                    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                        return cb(new BadRequestException('Only images are allowed'));
                    }

                    cb(null, `${Date.now()}-${id}-${file.originalname}`);
                },
                acl: 'public-read',
            }),
        }),
    ],
    controllers: [PetController],
    providers: [PetService],
})

export class PetModule {
}
