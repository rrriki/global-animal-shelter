import { User } from '../users/user.interface';

export interface JwtPayload {
    user: Partial<User>;
}
