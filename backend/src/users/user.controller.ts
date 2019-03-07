import { Controller, Body, Post, Get, Response, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './createUser.dto';
import { UserService } from './user.service';

@ApiUseTags('Users')
@Controller('users')
export class UserController {

    constructor (private userService: UserService) { }

    @Post()
    async createUser (@Response() res, @Body() user: CreateUserDto) {
        try {
            const newUser = await this.userService.createUser(user);
            return res.status(HttpStatus.OK).json(newUser);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('test')
    @UseGuards(AuthGuard())
    async testAuth() {
        return { message: 'Auth works!'};
    }
}
