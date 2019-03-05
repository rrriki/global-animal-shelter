import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtPayload } from './jwt-payload';

export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async signIn(): Promise<string> {
        const user: JwtPayload = { email: 'ricardo.rincon@vacasa.com' };
        return this.jwtService.sign(user);
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.userService.findOneByEmail(payload.email);
    }
}
