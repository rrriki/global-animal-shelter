import { Module, MulterModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PetSchema } from './pet.schema';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Pet', schema: PetSchema }]),
        MulterModule.register({ dest: '/uploads' }),
    ],
    controllers: [PetController],
    providers: [PetService],
})
export class PetModule {
}

