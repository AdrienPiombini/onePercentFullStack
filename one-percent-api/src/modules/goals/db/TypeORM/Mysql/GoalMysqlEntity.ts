import { GoalProperties } from 'src/core/domain/Goal';
import { BaseEntity } from 'src/core/persistence/BaseEntity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class GoalMysqlEntity implements BaseEntity<GoalProperties> {
  @PrimaryColumn()
  id: string;
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
  @Column({ type: 'json' })
  props: GoalProperties;
}
