import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GoalMysqlEntity } from 'src/modules/goals/db/TypeORM/Mysql/GoalMysqlEntity';

export const mysqlProvider: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'one_percent',
  entities: [GoalMysqlEntity],
  synchronize: true,
};
