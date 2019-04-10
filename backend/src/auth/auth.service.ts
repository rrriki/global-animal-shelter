import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { LoginAttemptDTO } from './loginAttempt.dto';
import { UserService } from '../users/user.service';
import { Configuration } from '../configuration';
import { User } from '../users/user.interface';

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
            return { message: 'User not found', data: null };
        }
        // Check the supplied password against the hash stored for this email address
        if (await user.isValidPassword(loginAttempt.password)) {
            return { message: 'Login successful', data: { token: this.signTokenForPayload(user) } };
        } else {
            return { message: 'Wrong password', data: null };
        }
    }

    /**
     * This will be used when the user has already logged in and has a JWT
     * @param payload
     */
    async validateUserByJwt (payload: JwtPayload) {
        const { email } = payload.user;
        return await this.userService.findUserByEmail(email);
    }

    /**
     * Add the user info to the payload, and sign it using the JwtService and JWT_SECRET
     * @param payload
     */
    signTokenForPayload (payload) {
        // Convert  Mongoose doc to plain object to remove password
        const user = payload.toObject();
        delete user.password;

        const data: JwtPayload = {
            user,
        };

        const expiresIn = Configuration.getJwtExpirationSeconds();

        // Return signed JWT token.
        return this.jwtService.sign(data, { expiresIn });
    }
}
