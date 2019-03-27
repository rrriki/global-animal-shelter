import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
    @ApiModelProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiModelProperty()
    @IsNotEmpty()
    password: string;

    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    lastName: string;
}
