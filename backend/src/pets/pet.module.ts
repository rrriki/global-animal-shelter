import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PetSchema } from './pet.schema';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/shared/http-exception.filter';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Pet', schema: PetSchema }])],
    controllers: [PetController],
    providers: [PetService],
})
export class PetModule { }
