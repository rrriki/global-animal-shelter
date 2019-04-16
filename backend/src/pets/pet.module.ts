import { Module, MulterModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PetSchema } from './pet.schema';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import * as multer from 'multer';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Pet', schema: PetSchema }]),
        MulterModule.register({
            storage: multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, './uploads');
                },
                filename: (req, file, cb) => {
                    cb(null, `${ Date.now() }_${ file.originalname }`);
                },
            }),
        }),
    ],
    controllers: [PetController],
    providers: [PetService],
})

export class PetModule {
}
