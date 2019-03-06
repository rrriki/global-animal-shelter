import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Configuration } from '../configuration';
import { UserModule } from '../users/user.module';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secretOrPrivateKey: Configuration.getJwtSecret(),
            signOptions: {
                expiresIn: 3600,
            },
        }),
        UserModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {
}
