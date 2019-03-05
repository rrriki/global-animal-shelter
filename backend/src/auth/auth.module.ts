import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Configuration } from 'src/configuration';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secretOrPrivateKey: Configuration.getJwtSecret(),
            signOptions: {
                expiresIn: 3600,
            },
        })],
    controllers: [AuthController],
    providers: [AuthService, JwtService],
})
export class AuthModule { }
