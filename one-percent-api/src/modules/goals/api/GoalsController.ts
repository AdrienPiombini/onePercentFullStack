import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateGoalUsecase } from '../usecases/CreateGoalUsecase';
import { CreateGoalDto } from '../dto/CreateGoalDto';
import { GetAllGoalsUsecase } from '../usecases/GetAllGoalsUsecase';

@Controller('goals')
export class GoalController {
  constructor(
    private readonly createGoalUsecase: CreateGoalUsecase,
    private readonly getAllGoalsUseCase: GetAllGoalsUsecase,
  ) {}

  @Post('/:userId')
  @UsePipes(ValidationPipe)
  createGoal(
    @Body() data: CreateGoalDto,
    @Param('userId') userId: string,
  ): any {
    const canExecute = this.createGoalUsecase.canExecute();

    if (!canExecute) {
      return 401;
    }

    return this.createGoalUsecase.execute({ dto: data, userId });
  }

  @Get()
  getAllGoals(): any {
    return this.getAllGoalsUseCase.execute('1');
  }
}
