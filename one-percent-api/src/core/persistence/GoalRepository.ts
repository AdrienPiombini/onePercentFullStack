import { Goal } from '../domain/Goal';

export interface GoalRepository {
  save(data: Goal): Promise<Goal>;
  findByUserId(userId: string): Promise<Goal[]>;
}
