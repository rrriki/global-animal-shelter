import {User} from '../typing/user.interface';

export interface JwtPayload {
    user: Partial<User>;
}
