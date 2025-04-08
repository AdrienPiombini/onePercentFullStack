import { BaseEntity } from '../persistence/BaseEntity';
import { v4 } from 'uuid';

/**
 * Loosing weight
 * Follow diet and exercices 3 sessions per weeks
 * 10 weeks
 *
 * weeks done divide by total weeks multiply by 100 => 1/10*100
 */
export interface GoalProperties {
  name: string;
  description: string;
  numberOfTasksToBeDoneForReachIt: number;
  numberOfTaskDone: number;
  // Removed and be calculated directy on the frontend
  // achievementPercentage: number;
  userId: string;
}

export class Goal implements BaseEntity<GoalProperties> {
  constructor(
    public readonly id: string,
    public readonly props: GoalProperties,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  static create(props: GoalProperties): Goal {
    return new Goal(v4(), props, new Date(), new Date());
  }

  static restore(goal: Goal): Goal {
    return {
      id: goal.id,
      props: goal.props,
      createdAt: goal.createdAt,
      updatedAt: goal.updatedAt,
    };
  }
}
