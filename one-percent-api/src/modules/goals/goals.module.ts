import { Module } from '@nestjs/common';

import { CreateGoalUsecase } from './usecases/CreateGoalUsecase';
import { GoalController } from './api/GoalsController';
import { GoalSchema } from './db/TypeORM/MongoDb/GoalMongoEntity';
import { GetAllGoalsUsecase } from './usecases/GetAllGoalsUsecase';

import { MongooseModule } from '@nestjs/mongoose';
import { Goal } from 'src/core/domain/Goal';
import { GoalMongoRepository } from './db/TypeORM/MongoDb/GoalMongoRepository';
import { GoalMysqlEntity } from './db/TypeORM/Mysql/GoalMysqlEntity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [GoalController],
  providers: [
    CreateGoalUsecase,
    GetAllGoalsUsecase,
    {
      provide: 'Repository',
      useClass: GoalMongoRepository,
    },
  ],
  imports: [
    TypeOrmModule.forFeature([GoalMysqlEntity]),
    MongooseModule.forFeature([{ name: Goal.name, schema: GoalSchema }]),
  ],
})
export class GoalModule {}
