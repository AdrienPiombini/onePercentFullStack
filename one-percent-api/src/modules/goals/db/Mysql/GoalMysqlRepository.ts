import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Goal } from 'src/core/domain/Goal';
import { GoalRepository } from 'src/core/persistence/GoalRepository';
import { GoalMysqlEntity } from './GoalMysqlEntity';

export class GoalOrmRepository implements GoalRepository {
  constructor(
    @InjectRepository(GoalMysqlEntity)
    private readonly goalRepository: Repository<GoalMysqlEntity>,
  ) {}

  async save(goal: Goal): Promise<Goal> {
    const goalOrm = this.toGoalEntity(goal);
    const result = await this.goalRepository.save(goalOrm);
    return result;
  }
  async findByUserId(userId: string): Promise<Goal[]> {
    const result = await this.goalRepository.findBy({ props: { userId } });
    const goalListMapped: Goal[] = result.map((entite) =>
      this.fromGoalEntity(entite),
    );

    return goalListMapped;
  }

  private toGoalEntity(goal: Goal): GoalMysqlEntity {
    return {
      id: goal.id,
      props: goal.props,
      createdAt: goal.createdAt,
      updatedAt: goal.updatedAt,
    };
  }

  private fromGoalEntity(goalMongoEntity: GoalMysqlEntity): Goal {
    return Goal.restore(goalMongoEntity);
  }
}
