import { Controller, Body, Post, Get, Response, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDTO } from './createUser.dto';
import { UserService } from './user.service';
import { User } from '../shared/user.decorator';

@ApiUseTags('Users')
@Controller('users')
export class UserController {

    constructor (private userService: UserService) { }

    @Post()
    @ApiResponse({ status: HttpStatus.OK, description: 'User has been successfully created' })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error creating user' })
    async createUser (@Response() res, @Body() user: CreateUserDTO) {
        try {
            const newUser = await this.userService.createUser(user);
            return res.status(HttpStatus.OK).json(newUser);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('locked')
    @UseGuards(AuthGuard())
    async testAuth (@User() user) {
        console.log(user);
        return { message: `${ user }, auth works!` };
    }
}
