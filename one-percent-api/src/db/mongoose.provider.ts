import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { GoalMongoEntity } from 'src/modules/goals/db/TypeORM/MongoDb/GoalMongoEntity';

// to move in env file
const username = 'adrienpiombini';
const password = 'l6r939fiSvgBC3xU';
export const mongoURI = `mongodb+srv://${username}:${password}@cluster0.zulsleg.mongodb.net/one_percent?retryWrites=true&w=majority&appName=Cluster0`;

export const mongoDbProvider: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: mongoURI,
  synchronize: true,
  entities: [GoalMongoEntity],
};
