import {IsNotEmpty, Matches} from 'class-validator';

export class FindByIdDTO {
    @IsNotEmpty()
    @Matches(/^[0-9a-fA-F]{24}$/, {message: 'Invalid ID'}) // Mongo's ID Regex
    id: string;
}
