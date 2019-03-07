import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { LoginAttemptDTO } from './loginAttempt.dto';
import { UserService } from '../users/user.service';

const logger = new Logger('AuthService');

@Injectable()
export class AuthService {
    constructor (
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    /**
     * This will be used when the user is initially logging in with their email and password
     * @param loginAttempt
     */
    async validateUserByPassword (loginAttempt: LoginAttemptDTO) {
        const user = await this.userService.findUserByEmail(loginAttempt.email);

        if (!user) {
            return { message: 'User not found', token: null };
        }
        // Check the supplied password against the hash stored for this email address
        if (await user.isValidPassword(loginAttempt.password)) {
            return { message: 'Login successful', ...this.createJwtPayload(user) };
        } else {
            return { message: 'Wrong password', token: null };
        }
    }

    /**
     * This will be used when the user has already logged in and has a JWT
     * @param payload
     */
    async validateUserByJwt (payload: JwtPayload) {
        const user = await this.userService.findUserByEmail(payload.email);

        if (user) {
            return this.createJwtPayload(user);
        } else {
            throw new UnauthorizedException();
        }
    }

    /**
     * Add the user’s email address to the payload, and sign it using the JwtService and JWT_SECRET
     * @param user
     */
    createJwtPayload (user) {
        const data: JwtPayload = {
            email: user.email,
        };

        const jwt = this.jwtService.sign(data);

        return {
            expires: 3600,
            token: jwt,
        };
    }
}
