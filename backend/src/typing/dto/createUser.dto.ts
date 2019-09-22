import {ApiModelProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString, Length} from 'class-validator';

export class CreateUserDTO {
    @ApiModelProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @Length(8, 20)
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
