import { IsNotEmpty } from 'class-validator';

export class CreateGoalDto {
  @IsNotEmpty({ message: 'Name required for GoalCreation' })
  name: string;
  @IsNotEmpty({ message: 'Description required for GoalCreation' })
  description: string;
  @IsNotEmpty({ message: 'Number required for GoalCreation' })
  numberOfTasksToBeDoneForReachIt: number;
}
