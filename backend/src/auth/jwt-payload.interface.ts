import { User } from '../users/user.interface';

export interface JwtPayload {
    user: User;
}
