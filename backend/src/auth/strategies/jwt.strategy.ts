import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {JwtPayload} from '../jwt-payload.interface';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {AuthService} from '../auth.service';
import {Configuration} from '../../configuration';
import {User} from '../../typing/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: Configuration.getJwtSecret(),
        });
    }

    /**
     * The return value of this method will be attached to the request (by default under the property user)
     * @param payload - Decoded token payload
     */
    async validate(payload: JwtPayload): Promise<User> {
        const user: User = await this.authService.validateUserByJwt(payload);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
