import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import * as _ from 'lodash';
import {Pet} from '../typing/pet.interface';
import {CreatePetDTO} from '../typing/dto/createPet.dto';
import {logPerformance} from '../shared/log-performance.decorator';

@Injectable()
export class PetService {
    constructor(@InjectModel('Pet') private readonly petModel: Model<Pet>) { }

    @logPerformance()
    async createPet(pet: CreatePetDTO, files: any[]): Promise<Pet> {
        const photos = _.map(files, (file) => file.location);
        const newPet = await new this.petModel({...pet, photos});
        return await newPet.save();
    }

    @logPerformance((instance, params) => params[0])
    async updatePetById(id: string, pet: CreatePetDTO): Promise<Pet> {
        return this.petModel.findOneAndUpdate({_id: id}, pet, {new: true});
    }

    @logPerformance((instance, params) => params[0])
    async findPetById(id: string): Promise<Pet> {
        return this.petModel.findById(id);
    }

    @logPerformance()
    async findAllPets(): Promise<Pet[]> {
        return this.petModel.find({isDeleted: false});
    }

    @logPerformance((instance, params) => params[0])
    async deletePetById(id: string): Promise<Pet> {
        return this.petModel.findOneAndUpdate({_id: id}, {isDeleted: true}, {new: true});
    }
}
