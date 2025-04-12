import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { GoalProperties } from 'src/core/domain/Goal';
import { BaseEntity } from 'src/core/persistence/BaseEntity';

export class GoalMongoEntity implements BaseEntity<GoalProperties> {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;

  props: GoalProperties;
}

export type GoalDocument = HydratedDocument<Goal>;

@Schema()
export class Goal {
  @Prop({
    unique: true,
  })
  id: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;

  @Prop({ type: Object })
  props: GoalProperties;
}

export const GoalSchema = SchemaFactory.createForClass(Goal);
