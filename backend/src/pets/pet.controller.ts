import {
    Controller,
    Headers,
    Body,
    Param,
    Get,
    Post,
    Put,
    Response,
    HttpStatus,
    HttpException,
    Delete, UseInterceptors, FilesInterceptor, UploadedFiles, UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { PetService } from './pet.service';
import { Pet } from './pet.interface';
import { CreatePetDTO } from './createPet.dto';

@ApiUseTags('pets')
@Controller('pets')
export class PetController {

    constructor (private readonly petService: PetService) { }

    @Post()
    @UseGuards(AuthGuard())
    @ApiResponse({ status: HttpStatus.OK, description: 'Pet has been successfully created' })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error creating Pet' })
    @UseInterceptors(FilesInterceptor('files'))
    public async createPet (@Response() res, @UploadedFiles() files, @Body() pet: any, @Headers() headers): Promise<Pet> {
        // https://github.com/nestjs/nest/issues/1169
        try {
            // const newPet = await this.petService.createPet(pet);
            return res.status(HttpStatus.OK).json();
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    @ApiResponse({ status: HttpStatus.OK, description: 'Pet has been successfully modified' })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error modifying Pet' })
    public async updatePetById (@Response() res, @Param('id') id: string, @Body() pet: CreatePetDTO): Promise<Pet> {
        try {
            const updatedPet = await this.petService.updatePetById(id, pet);
            return res.status(HttpStatus.OK).json({ updated: !!updatedPet, pet: updatedPet });
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id') // TODO: Validate query param to be a valid mongoose id (id.match(/^[0-9a-fA-F]{24}$/)
    @ApiResponse({ status: HttpStatus.OK, description: 'Pet has been successfully fetched' })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error fetching Pet' })
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
    @ApiResponse({ status: HttpStatus.OK, description: 'Pets have been successfully fetched' })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error fetching Pets' })
    public async findAllPets (@Response() res): Promise<Pet[]> {
        try {
            const pets = await this.petService.findAllPets();
            return res.status(HttpStatus.OK).json(pets);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    @ApiResponse({ status: HttpStatus.OK, description: 'Pet has been successfully deleted' })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error deleting Pet' })
    public async deletePetById (@Response() res, @Param('id') id: string): Promise<boolean> {
        try {
            const deleted = await this.petService.deletePetById(id);
            return res.status(HttpStatus.OK).json({ deleted });
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
