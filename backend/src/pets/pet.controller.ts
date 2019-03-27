import { Controller, Body, Param, Get, Post, Put, Response, HttpStatus, HttpException, Delete } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { PetService } from './pet.service';
import { Pet } from './pet.interface';
import { CreatePetDTO } from './createPet.dto';

@ApiUseTags('pets')
@Controller('pets')
export class PetController {

    constructor (private readonly petService: PetService) { }

    @Post()
    public async createPet (@Response() res, @Body() pet: CreatePetDTO): Promise<Pet> {
        try {
            const newPet = await this.petService.createPet(pet);
            return res.status(HttpStatus.OK).json(newPet);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    public async updatePetById (@Response() res, @Param('id') id: string, @Body() pet: CreatePetDTO): Promise<Pet> {
        try {
            const updatedPet = await this.petService.updatePetById(id, pet);
            return res.status(HttpStatus.OK).json({ updated: !!updatedPet, pet: updatedPet });
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id') // TODO: Validate query param to be a valid mongoose id (id.match(/^[0-9a-fA-F]{24}$/)
    public async findPetById (@Response() res, @Param('id') id: string): Promise<Pet> {
        try {
            const pet = await this.petService.findPetById(id);
            if (!pet) {
                return res.status(HttpStatus.NOT_FOUND).json({ message: 'Pet not found' });
            }
            return res.status(HttpStatus.OK).json(pet);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    public async findAllPets (@Response() res): Promise<Pet[]> {
        try {
            const pets = await this.petService.findAllPets();
            return res.status(HttpStatus.OK).json(pets);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    public async deletePetById (@Response() res, @Param('id') id: string): Promise<boolean> {
        try {
            const deleted = await this.petService.deletePetById(id);
            return res.status(HttpStatus.OK).json({ deleted });
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
