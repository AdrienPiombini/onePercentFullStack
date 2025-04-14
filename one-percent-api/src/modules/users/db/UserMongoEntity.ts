import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserProperties } from 'src/core/domain/User';
import { BaseEntity } from 'src/core/persistence/BaseEntity';

export class UserMongoEntity implements BaseEntity<UserProperties> {
  id: string;
  props: UserProperties;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    unique: true,
  })
  id: string;

  @Prop({ type: Object })
  props: UserProperties;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
