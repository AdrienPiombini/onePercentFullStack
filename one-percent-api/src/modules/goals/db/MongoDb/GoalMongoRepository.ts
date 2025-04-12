import { Goal } from 'src/core/domain/Goal';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GoalDocument, GoalMongoEntity } from './GoalMongoEntity';
import { GoalRepository } from 'src/core/persistence/GoalRepository';

export class GoalMongoRepository implements GoalRepository {
  constructor(
    @InjectModel(Goal.name)
    private readonly model: Model<GoalDocument>,
  ) {}

  async save(goal: Goal): Promise<Goal> {
    const document = new this.model(goal);
    return await document.save();
  }

  async findByUserId(userId: string): Promise<Goal[]> {
    const goals = await this.model.find({ 'props.userId': userId }).exec();
    return goals.map((goal) => this.fromGoalMongoEntity(goal));
  }

  private toGoalMongoEntity(goal: Goal): GoalMongoEntity {
    return {
      id: goal.id,
      props: goal.props,
      createdAt: goal.createdAt,
      updatedAt: goal.updatedAt,
    };
  }

  private fromGoalMongoEntity(goalMongoEntity: GoalMongoEntity): Goal {
    return Goal.restore(goalMongoEntity);
  }
}
