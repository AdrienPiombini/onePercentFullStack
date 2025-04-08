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

  //should deserialize properties to make basic SQL queries
  // json queries not handle by ORM query builder
  @Column({ type: 'json' })
  props: GoalProperties;
}
