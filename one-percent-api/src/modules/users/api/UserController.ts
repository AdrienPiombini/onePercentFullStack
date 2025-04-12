import { Body, Controller, Post } from '@nestjs/common';
import {
  RegisterUseCase,
  RegisterUserInput,
} from '../usecases/RegisterUsecase';

@Controller('users')
export class UserController {
  constructor(private readonly registerUsecase: RegisterUseCase) {}

  @Post('/register')
  async register(@Body() data: RegisterUserInput): Promise<any> {
    const canExecute = await this.registerUsecase.canExecute(data);

    if (!canExecute) {
      return 401;
    }

    return this.registerUsecase.execute(data);
  }
}
