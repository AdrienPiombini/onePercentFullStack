import { Module } from '@nestjs/common';
import { UserController } from './api/UserController';
import { RegisterUseCase } from './usecases/RegisterUsecase';
import { UserMongoRepository } from './db/UserMongoRepository';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/core/domain/User';
import { UserSchema } from './db/UserMongoEntity';

@Module({
  controllers: [UserController],
  providers: [
    RegisterUseCase,
    {
      provide: 'UserRepository',
      useClass: UserMongoRepository,
    },
  ],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class UserModule {}
