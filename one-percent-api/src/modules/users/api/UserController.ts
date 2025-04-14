import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterUseCase } from '../usecases/RegisterUsecase';
import { RegisterUserDto } from '../dto/IdentityDto';

@Controller('users')
export class UserController {
  constructor(private readonly registerUsecase: RegisterUseCase) {}

  @UsePipes(ValidationPipe)
  @Post('/register')
  async register(@Body() data: RegisterUserDto): Promise<any> {
    const canExecute = await this.registerUsecase.canExecute(data);

    if (!canExecute) {
      return 400;
    }

    await this.registerUsecase.execute(data);
  }
}
