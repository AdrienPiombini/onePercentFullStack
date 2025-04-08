import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { GoalProperties } from 'src/core/domain/Goal';
import { BaseEntity } from 'src/core/persistence/BaseEntity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class GoalMongoEntity implements BaseEntity<GoalProperties> {
  @ObjectIdColumn()
  id: string;
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
  @Column()
  props: GoalProperties;
}

export type GoalDocument = HydratedDocument<Goal>;

@Schema()
export class Goal {
  @Prop()
  id: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;

  @Prop({ type: Object })
  props: GoalProperties;
}

export const GoalSchema = SchemaFactory.createForClass(Goal);
