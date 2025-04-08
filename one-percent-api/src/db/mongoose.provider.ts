import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GoalMongoEntity } from 'src/modules/goals/db/MongoDb/GoalMongoEntity';

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=${process.env.MONGO_APP_NAME}`;

export const mongoDbProviderAsync = {
  useFactory: () => ({
    uri: MONGO_URI,
  }),
};
export const mongoDbProvider: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: MONGO_URI,
  synchronize: true,
  entities: [GoalMongoEntity],
};
