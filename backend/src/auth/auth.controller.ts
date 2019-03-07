import { Controller, Body, Post, Response, HttpStatus } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAttemptDTO } from './loginAttempt.dto';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) { }

    @Post()
    async login (@Response() res, @Body() loginAttempt: LoginAttemptDTO) {
        const login = await this.authService.validateUserByPassword(loginAttempt);
        if (login.token) {
            res.status(HttpStatus.OK).json(login);
        } else {
            res.status(HttpStatus.UNAUTHORIZED).json(login);
        }
    }
}
