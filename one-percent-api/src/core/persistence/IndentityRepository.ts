import { Identity, User } from '../domain/User';

export interface UserRepository {
  save(user: User): Promise<User>;
  findByIdentity(identity: Identity): Promise<User | null>;
}
