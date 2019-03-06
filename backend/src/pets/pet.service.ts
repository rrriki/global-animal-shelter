import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pet } from './pet.interface';
import { CreatePetDTO } from './createPet.dto';

const logger = new Logger('PetService');

@Injectable()
export class PetService {
    constructor (@InjectModel('Pet') private readonly petModel: Model<Pet>) { }

    async createPet (pet: CreatePetDTO): Promise<Pet> {
        logger.log(`Creating new pet: ${ JSON.stringify(pet) }`);
        const newPet = await new this.petModel(pet);
        return await newPet.save();
    }

    async updatePetById (id: string, pet: CreatePetDTO): Promise<Pet> {
        logger.log(`Updating data for pet with id: ${ id }`);
        return await this.petModel.findOneAndUpdate({ _id: id }, pet, { new: true });
    }

    async findPetById (id: string): Promise<Pet> {
        logger.log(`Finding pet with id: ${ id }`);
        return await this.petModel.findById(id);
    }

    async findAllPets (): Promise<Pet[]> {
        logger.log(`Finding all pets`);
        return await this.petModel.find().exec();
    }

    async deletePetById (id: string): Promise<boolean> {
        logger.log(`Deleting pet with id:${ id }`);
        const pet = await this.petModel.findOneAndUpdate({ _id: id }, { isDeleted: true });
        return pet !== null;
    }
}
