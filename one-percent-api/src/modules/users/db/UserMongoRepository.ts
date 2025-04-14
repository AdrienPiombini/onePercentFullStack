import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Identity, User } from 'src/core/domain/User';
import { UserRepository } from 'src/core/persistence/IndentityRepository';
import { UserDocument, UserMongoEntity } from './UserMongoEntity';

export class UserMongoRepository implements UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly model: Model<UserDocument>, // @InjectModel(Identity.name)
  ) {}

  save(user: User): Promise<User> {
    const document = new this.model(user);

    return document.save();
  }

  async findByIdentity(identity: Identity): Promise<User | null> {
    const result = await this.model
      .findOne({
        'props.identity.fullName': identity.fullName,
      })
      .exec();

    if (result == null) {
      return null;
    }

    return this.fromUserMongoEntity(result);
  }
  private toUserMongoEntity(user: User): UserMongoEntity {
    return {
      id: user.id,
      props: user.props,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  private fromUserMongoEntity(userEntity: UserMongoEntity): User {
    return User.restore(userEntity);
  }
}
