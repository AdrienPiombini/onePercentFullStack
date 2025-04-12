import { Usecase } from 'src/core/usecases/Usecase';
import { Inject } from '@nestjs/common';
import { GoalRepository } from 'src/core/persistence/GoalRepository';

type GoalDto = {
  name: string;
  description: string;
  numberOfTasksToBeDoneForReachIt: number;
  numberOfTaskDone: number;
};

export class GetAllGoalsUsecase implements Usecase<string, GoalDto[]> {
  constructor(
    @Inject('GoalRepository')
    private readonly goalRepository: GoalRepository,
  ) {}

  async execute(userId: string): Promise<GoalDto[]> {
    const goalsEntityList = await this.goalRepository.findByUserId(userId);

    if (goalsEntityList.length <= 0) {
      return [];
    }

    const goalDtoList: GoalDto[] = goalsEntityList.map(({ props }) => ({
      name: props.name,
      description: props.description,
      numberOfTaskDone: props.numberOfTaskDone,
      numberOfTasksToBeDoneForReachIt: props.numberOfTasksToBeDoneForReachIt,
    }));

    return goalDtoList;
  }
  canExecute(): Promise<boolean> | boolean {
    throw new Error('Method not implemented.');
  }
}
