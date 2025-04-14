import { Inject, Injectable } from '@nestjs/common';
import { User, UserProperties } from 'src/core/domain/User';
import { UserRepository } from 'src/core/persistence/IndentityRepository';
import { Usecase } from 'src/core/usecases/Usecase';
import { v4 } from 'uuid';
import { RegisterUserDto } from '../dto/IdentityDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterUseCase implements Usecase<RegisterUserDto, void> {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(request: RegisterUserDto): Promise<void> {
    const { firstname, lastname, password, email } = request;

    const identity = User.buildIdentity(firstname, lastname);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const props: UserProperties = {
      id: v4(),
      firstname,
      lastname,
      password: hashedPassword,
      email,
      identity,
    };
    const user = User.create(props);
    await this.userRepository.save(user);
  }

  async canExecute(request: RegisterUserDto): Promise<boolean> {
    const validation = User.validate(request);
    if (!validation) {
      return false;
    }

    const identity = User.buildIdentity(request.firstname, request.lastname);
    const existedUser = await this.userRepository.findByIdentity(identity);

    return existedUser ? false : true;
  }
}
