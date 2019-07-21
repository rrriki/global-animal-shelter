import {IsEmail, IsNotEmpty} from 'class-validator';

export class FindByEmailDTO {

    @IsNotEmpty()
    @IsEmail()
    email: string;
}
