import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateGoalDto } from '../dto/CreateGoalDto';
import { Output, Usecase } from 'src/core/usecases/Usecase';
import { Goal, GoalProperties } from 'src/core/domain/Goal';
import { v4 } from 'uuid';

import { GoalRepository } from 'src/core/persistence/GoalRepository';

type CreateGoalUsecaseInput = {
  dto: CreateGoalDto;
  userId: string;
};

@Injectable()
export class CreateGoalUsecase
  implements Usecase<CreateGoalUsecaseInput, Output>
{
  constructor(
    @Inject('Repository')
    private readonly goalRepository: GoalRepository,
  ) {}

  async execute(request: CreateGoalUsecaseInput): Promise<Output> {
    const props: GoalProperties = {
      ...request.dto,
      numberOfTaskDone: 0,
      userId: request.userId,
    };

    const entity = Goal.create(props);

    Logger.log(`Saving Goal Entity ${JSON.stringify(entity)}in Db... `);

    const result = await this.goalRepository.save(entity);

    if (!result) {
      return {
        success: false,
        message: 'An error occured when reaching the DB',
      };
    }

    Logger.log(`Entity Saved ${JSON.stringify(result)}`);

    return {
      success: true,
      message: 'ok',
    };
  }

  canExecute(): boolean {
    return true;
  }
}
