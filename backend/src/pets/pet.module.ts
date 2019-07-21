import {Module} from '@nestjs/common';
import {MulterModule} from '@nestjs/platform-express';
import {PassportModule} from '@nestjs/passport';
import {MongooseModule} from '@nestjs/mongoose';
import {PetSchema} from './pet.schema';
import {PetService} from './pet.service';
import {PetController} from './pet.controller';
import * as multer from 'multer';
import {Configuration} from '../configuration';

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt', session: false}),
        MongooseModule.forFeature([{name: 'Pet', schema: PetSchema}]),
        MulterModule.register({
            storage: multer.diskStorage({
                destination: (req, file, cb) => {
                    const {user: {id}} = req as any;

                    const uploadPath = Configuration.getPublicUploadsDirectory(id);

                    cb(null, uploadPath);
                },
                filename: (req, file, cb) => {
                    cb(null, `${Date.now()}_${file.originalname}`);
                },
            }),
        }),
    ],
    controllers: [PetController],
    providers: [PetService],
})

export class PetModule {
}
