import { Inject, Injectable } from '@nestjs/common';
import { Identity, User, UserProperties } from 'src/core/domain/User';
import { UserRepository } from 'src/core/persistence/IndentityRepository';
import { Usecase } from 'src/core/usecases/Usecase';
import { v4 } from 'uuid';

export type RegisterUserInput = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

@Injectable()
export class RegisterUseCase implements Usecase<RegisterUserInput, void> {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(request: RegisterUserInput): Promise<void> {
    const identity = this.buildIdentity(request.firstname, request.lastname);
    const props: UserProperties = {
      id: v4(),
      ...request,
      identity,
    };
    const user = User.create(props);
    await this.userRepository.save(user);
  }

  async canExecute(request: RegisterUserInput): Promise<boolean> {
    const validation = User.validate(request);
    if (!validation) {
      return false;
    }

    const identity = this.buildIdentity(request.firstname, request.lastname);
    const result = await this.userRepository.findByIdentity(identity);
    if (result) {
      return false;
    }
    return true;
  }

  private buildIdentity(firstname: string, lastname: string): Identity {
    const fullName = firstname + lastname;
    console.log(fullName);
    return {
      fullName,
    };
  }
}
