import {
    Controller,
    Headers,
    Body,
    Param,
    Response,
    Get,
    Post,
    Put,
    Delete,
    HttpStatus,
    HttpException,
    UseInterceptors, UseGuards, UploadedFiles,
} from '@nestjs/common';
import {FilesInterceptor} from '@nestjs/platform-express';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiResponse} from '@nestjs/swagger';
import * as _ from 'lodash';
import {PetService} from './pet.service';
import {Pet} from '../typing/pet.interface';
import {CreatePetDTO} from '../typing/dto/createPet.dto';
import {FindByIdDTO} from '../typing/dto/findById.dto';
import {file} from '@babel/types';

@ApiUseTags('pets')
@Controller('pets')
export class PetController {

    constructor(private readonly petService: PetService) { }

    @Post()
    @UseGuards(AuthGuard())
    @ApiResponse({status: HttpStatus.OK, description: 'Pet has been successfully created'})
    @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error creating Pet'})
    @UseInterceptors(FilesInterceptor('files'))
    public async createPet(@Response() res, @UploadedFiles() files, @Body() pet: CreatePetDTO, @Headers() headers): Promise<Pet> {
        // https://github.com/nestjs/nest/issues/1169
        try {
            const newPet = await this.petService.createPet(pet, files);
            return res.status(HttpStatus.OK).json();
        } catch (e) {
            throw new HttpException(e.message, e.code);
        }
    }

    @Put(':id')
    @ApiResponse({status: HttpStatus.OK, description: 'Pet updated successfully'})
    @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error updating Pet'})
    public async updatePetById(@Response() res, @Param() params: FindByIdDTO, @Body() pet: CreatePetDTO): Promise<Pet> {
        try {
            const updatedPet = await this.petService.updatePetById(params.id, pet);

            if (_.isNil(updatedPet)) {
                return res.status(HttpStatus.NOT_FOUND).json({message: 'Pet not found'});
            }
            return res.status(HttpStatus.OK).json({pet: updatedPet});
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    @ApiResponse({status: HttpStatus.OK, description: 'Pet fetched successfully'})
    @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error fetching Pet'})
    public async findPetById(@Response() res, @Param() params: FindByIdDTO): Promise<Pet> {
        try {
            const pet = await this.petService.findPetById(params.id);

            if (_.isNil(pet)) {
                return res.status(HttpStatus.NOT_FOUND).json({message: 'Pet not found'});
            }
            return res.status(HttpStatus.OK).json(pet);
        } catch (e) {
            throw new HttpException(e.message, e.code);
        }
    }

    @Get()
    @ApiResponse({status: HttpStatus.OK, description: 'Pets fetched successfully'})
    @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error fetching Pets'})
    public async findAllPets(@Response() res): Promise<Pet[]> {
        try {
            const pets = await this.petService.findAllPets();
            return res.status(HttpStatus.OK).json(pets);
        } catch (e) {
            throw new HttpException(e.message, e.code);
        }
    }

    @Delete(':id')
    @ApiResponse({status: HttpStatus.OK, description: 'Pet deleted successfully'})
    @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error deleting Pet'})
    public async deletePetById(@Response() res, @Param() params: FindByIdDTO): Promise<boolean> {
        try {
            const pet = await this.petService.deletePetById(params.id);

            if (_.isNil(pet)) {
                return res.status(HttpStatus.NOT_FOUND).json({message: 'Pet not found'});
            }
            return res.status(HttpStatus.OK).json({message: 'Pet deleted successfully'});
        } catch (e) {
            throw new HttpException(e.message, e.code);
        }
    }
}
