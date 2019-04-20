import { Controller, Body, Post, Response, HttpStatus, HttpException } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAttemptDTO } from './loginAttempt.dto';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) { }

    @Post()
    async login (@Response() res, @Body() loginAttempt: LoginAttemptDTO) {
        try {
            const result = await this.authService.validateUserByPassword(loginAttempt);
            if (result.data) {
                res.status(HttpStatus.OK).json(result);
            } else {
                res.status(HttpStatus.UNAUTHORIZED).json(result);
            }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
