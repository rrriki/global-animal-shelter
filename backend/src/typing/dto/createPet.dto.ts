import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import {IsNotEmpty, IsBooleanString, Length, IsArray} from 'class-validator';

export class CreatePetDTO {
    @ApiModelProperty()
    @IsNotEmpty()
    name: string;

    @ApiModelProperty()
    @IsNotEmpty()
    type: string;

    @ApiModelPropertyOptional()
    breed: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @Length(10, 100)
    description: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsBooleanString()
    isLost: boolean;
}
