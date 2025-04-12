import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserProperties } from 'src/core/domain/User';
import { BaseEntity } from 'src/core/persistence/BaseEntity';

export class UserMongoEntity implements BaseEntity<UserProperties> {
  id: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  props: UserProperties;
}

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    unique: true,
  })
  id: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;

  @Prop({ type: Object })
  props: UserProperties;
}

export const UserSchema = SchemaFactory.createForClass(User);
